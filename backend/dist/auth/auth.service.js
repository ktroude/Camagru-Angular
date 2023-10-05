"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = require("bcryptjs");
const jwt_1 = require("@nestjs/jwt");
const mails_service_1 = require("../mails/mails.service");
const config_1 = require("@nestjs/config");
let AuthService = class AuthService {
    constructor(prismaService, jwtService, mailsService, configService) {
        this.prismaService = prismaService;
        this.jwtService = jwtService;
        this.mailsService = mailsService;
        this.configService = configService;
    }
    async signupLocal(dto, res) {
        try {
            const hash = await this.hashData(dto.password);
            const newUser = await this.prismaService.user.create({
                data: {
                    email: dto.email,
                    username: dto.username,
                    pseudo: dto.pseudo,
                    password: hash,
                    role: 'USER',
                },
            });
            const tokens = await this.getTokens(newUser.id, newUser.username, newUser.role);
            await this.updateRefreshTokenHash(newUser.id, tokens.refresh_token);
            res.cookie('access_token', tokens.access_token, { httpOnly: true });
            res.cookie('refresh_token', tokens.refresh_token, { httpOnly: true });
            const mailToken = await this.createToken({ email: newUser.email }, {
                secret: this.configService.get('SENGRID_JWT_SECRET'),
                expiresIn: 60 * 60,
            });
            const url = `http://localhost:8080/auth/confirm/${mailToken}`;
            const html = `<p> Click <a href= "${url}"> here </a> to confirm email</p>`;
            await this.mailsService.sendMail({
                html,
                to: newUser.email,
                subject: 'Confirm your email',
            });
            return res.status(201).send();
        }
        catch {
            throw new common_1.HttpException('Username or email already taken', common_1.HttpStatus.CONFLICT);
        }
    }
    async signinLocal(dto, res) {
        try {
            let user = await this.prismaService.user.findUnique({
                where: {
                    email: dto.email,
                },
            });
            if (!user) {
                user = await this.prismaService.user.findUnique({
                    where: {
                        username: dto.email,
                    },
                });
            }
            if (!user) {
                throw new common_1.ForbiddenException('Access denied');
            }
            const passwordMatches = await bcrypt.compare(dto.password, user.password);
            if (!passwordMatches) {
                throw new common_1.ForbiddenException('Access denied');
            }
            const tokens = await this.getTokens(user.id, user.username, user.role);
            await this.updateRefreshTokenHash(user.id, tokens.refresh_token);
            res.cookie('access_token', tokens.access_token, { httpOnly: true });
            res.cookie('refresh_token', tokens.refresh_token, { httpOnly: true });
            return res.status(200).send();
        }
        catch {
            throw new common_1.NotFoundException('This user does not exist in database');
        }
    }
    async logout(userId, res) {
        await this.prismaService.user.updateMany({
            where: {
                id: userId,
                hashedRefreshToken: {
                    not: null,
                },
            },
            data: {
                hashedRefreshToken: null,
            },
        });
        res.clearCookie('access_token');
        res.clearCookie('refresh_token');
        return res.status(200).send();
    }
    async refreshTokens(userId, refreshToken, res) {
        const user = await this.prismaService.user.findUnique({
            where: {
                id: userId,
            },
        });
        if (!user || !user.hashedRefreshToken) {
            throw new common_1.NotFoundException('User or his refresh token does not exist');
        }
        const matches = bcrypt.compare(refreshToken, user.hashedRefreshToken);
        if (!matches) {
            throw new common_1.ForbiddenException('Access denied');
        }
        const tokens = await this.getTokens(user.id, user.username, user.role);
        await this.updateRefreshTokenHash(user.id, tokens.refresh_token);
        res.cookie('access_token', tokens.access_token, { httpOnly: true });
        res.cookie('refresh_token', tokens.refresh_token, { httpOnly: true });
        return res.status(200).send();
    }
    async confirmEmail(token) {
        const match = this.jwtService.verify(token, {
            secret: this.configService.get('SENGRID_JWT_SECRET'),
        });
        if (!match ||
            typeof match !== 'object' ||
            !match.email ||
            typeof match.email !== 'string') {
            throw new common_1.UnauthorizedException('Access denied');
        }
        try {
            const user = await this.prismaService.user.findUnique({
                where: {
                    email: match.email,
                },
            });
            if (!user)
                throw new common_1.NotFoundException('User does not exist');
            await this.prismaService.user.update({
                where: {
                    id: user.id,
                },
                data: {
                    isEmailConfirmed: true,
                },
            });
        }
        catch {
            throw new common_1.UnauthorizedException('Access denied');
        }
    }
    async sendEmailForgotPassword(data) {
        const user = await this.prismaService.user.findUnique({
            where: {
                email: data.email,
            },
        });
        if (!user)
            throw new common_1.NotFoundException('User or does not exist');
    }
    async hashData(data) {
        return await bcrypt.hash(data, 10);
    }
    async getTokens(userId, username, role) {
        const data = {
            sub: userId,
            username,
            role,
        };
        const [accessT, refreshT] = await Promise.all([
            this.createToken(data, {
                secret: this.configService.get('ACCESS_TOKEN_SECRET'),
                expiresIn: 60 * 15,
            }),
            this.createToken(data, {
                secret: this.configService.get('REFRESH_TOKEN_SECRET'),
                expiresIn: 60 * 60 * 24 * 7,
            }),
        ]);
        return {
            access_token: accessT,
            refresh_token: refreshT,
        };
    }
    async updateRefreshTokenHash(userId, refreshToken) {
        const hash = await this.hashData(refreshToken);
        await this.prismaService.user.update({
            where: {
                id: userId,
            },
            data: {
                hashedRefreshToken: hash,
            },
        });
    }
    async createToken(payload, option) {
        return await this.jwtService.signAsync(payload, option);
    }
    createForgottenPasswordToken() { }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        mails_service_1.MailsService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map