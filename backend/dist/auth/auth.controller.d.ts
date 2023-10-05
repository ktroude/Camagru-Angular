import { AuthService } from './auth.service';
import { EmailDTO, signinLocalDTO, signupLocalDTO } from './DTO';
import { Response } from 'express';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signupLocal(dto: signupLocalDTO, res: Response): Promise<Response>;
    signinLocal(dto: signinLocalDTO, res: Response): Promise<Response>;
    logout(userId: number, res: Response): Promise<Response<any, Record<string, any>>>;
    refreshTokens(userId: number, refreshToken: string, res: Response): Promise<Response<any, Record<string, any>>>;
    confirmEmail(token: string): Promise<void>;
    sendEmailForgotPassword(email: EmailDTO): Promise<void>;
}
