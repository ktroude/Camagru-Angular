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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = require("bcryptjs");
let UserService = class UserService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async getAllUsers() {
        return await this.prismaService.user.findMany({
            select: {
                id: true,
                email: true,
                username: true,
                pseudo: true,
            },
        });
    }
    async getCurrentUserData(userId) {
        try {
            return await this.prismaService.user.findUnique({
                where: {
                    id: userId,
                },
                select: {
                    id: true,
                    email: true,
                    username: true,
                    pseudo: true,
                },
            });
        }
        catch {
            throw new common_1.NotFoundException('User not found');
        }
    }
    async updateEmail(userId, data) {
        try {
            return await this.prismaService.user.update({
                where: {
                    id: userId,
                },
                data: {
                    email: data.email,
                },
            });
        }
        catch {
            throw new common_1.BadRequestException('New email must be an email or user does not exist');
        }
    }
    async updatePassword(userId, data) {
        try {
            const hash = await this.hashData(data.password);
            return await this.prismaService.user.update({
                where: {
                    id: userId,
                },
                data: {
                    password: hash,
                },
            });
        }
        catch {
            throw new common_1.BadRequestException('New password must be a string or user does not exist');
        }
    }
    async updatePseudo(userId, data) {
        try {
            return await this.prismaService.user.update({
                where: {
                    id: userId,
                },
                data: {
                    pseudo: data.pseudo,
                },
            });
        }
        catch {
            throw new common_1.BadRequestException('New pseudo must be string or user does not exist');
        }
    }
    async hashData(data) {
        return await bcrypt.hash(data, 10);
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
//# sourceMappingURL=user.service.js.map