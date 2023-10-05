import { PrismaService } from 'src/prisma/prisma.service';
import { EmailDTO, signinLocalDTO, signupLocalDTO } from './DTO';
import { Tokens } from './types';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
export declare class AuthService {
    private prismaService;
    private jwtService;
    constructor(prismaService: PrismaService, jwtService: JwtService);
    signupLocal(dto: signupLocalDTO, res: Response): Promise<Response>;
    signinLocal(dto: signinLocalDTO, res: Response): Promise<Response>;
    logout(userId: number, res: Response): Promise<Response<any, Record<string, any>>>;
    refreshTokens(userId: number, refreshToken: string, res: Response): Promise<Response>;
    sendEmailForgotPassword(data: EmailDTO): Promise<void>;
    hashData(data: string): Promise<string>;
    getTokens(userId: number, username: string, role: string): Promise<Tokens>;
    updateRefreshTokenHash(userId: number, refreshToken: string): Promise<void>;
    createForgottenPasswordToken(): void;
}
