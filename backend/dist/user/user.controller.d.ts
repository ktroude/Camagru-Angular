import { UserService } from './user.service';
import { User } from './types';
import { PasswordDto } from './dto/password.dto';
import { PseudoDto } from './dto/pseudo.dto';
import { EmailDto } from './dto/email.dto';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getCurrentUserData(userId: number): Promise<User>;
    updateEmail(userId: number, data: EmailDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        username: string;
        pseudo: string;
        password: string;
        role: string;
        hashedRefreshToken: string;
        isEmailConfirmed: boolean;
    }>;
    updatePassword(userId: number, data: PasswordDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        username: string;
        pseudo: string;
        password: string;
        role: string;
        hashedRefreshToken: string;
        isEmailConfirmed: boolean;
    }>;
    updatePseudo(userId: number, data: PseudoDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        username: string;
        pseudo: string;
        password: string;
        role: string;
        hashedRefreshToken: string;
        isEmailConfirmed: boolean;
    }>;
    getAllUsers(): Promise<User[]>;
    updateEmailByAdmin(userId: number, data: EmailDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        username: string;
        pseudo: string;
        password: string;
        role: string;
        hashedRefreshToken: string;
        isEmailConfirmed: boolean;
    }>;
    updatePasswordByAdmin(userId: number, data: PasswordDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        username: string;
        pseudo: string;
        password: string;
        role: string;
        hashedRefreshToken: string;
        isEmailConfirmed: boolean;
    }>;
    updatePseudoByAdmin(userId: number, data: PseudoDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        username: string;
        pseudo: string;
        password: string;
        role: string;
        hashedRefreshToken: string;
        isEmailConfirmed: boolean;
    }>;
    data: any;
}
