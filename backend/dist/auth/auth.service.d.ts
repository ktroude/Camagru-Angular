import { PrismaService } from 'src/prisma/prisma.service';
import { EmailDTO, signinLocalDTO, signupLocalDTO } from './DTO';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { MailsService } from 'src/mails/mails.service';
import { ConfigService } from '@nestjs/config';
export declare class AuthService {
    private readonly prismaService;
    private readonly jwtService;
    private readonly mailsService;
    private readonly configService;
    constructor(prismaService: PrismaService, jwtService: JwtService, mailsService: MailsService, configService: ConfigService);
    signupLocal(dto: signupLocalDTO, res: Response): Promise<Response>;
    signinLocal(dto: signinLocalDTO, res: Response): Promise<Response>;
    logout(userId: number, res: Response): Promise<Response<any, Record<string, any>>>;
    refreshTokens(userId: number, refreshToken: string, res: Response): Promise<Response>;
    confirmEmail(token: string): Promise<void>;
    sendEmailForgotPassword(data: EmailDTO): Promise<void>;
    private hashData;
    private getTokens;
    private updateRefreshTokenHash;
    private createToken;
    createForgottenPasswordToken(): void;
}
