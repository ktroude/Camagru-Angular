import { PrismaService } from 'src/prisma/prisma.service';
import { User } from './types';
import { EmailDto, PasswordDto, PseudoDto } from './dto';
export declare class UserService {
    private prismaService;
    constructor(prismaService: PrismaService);
    getAllUsers(): Promise<User[]>;
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
    hashData(data: string): Promise<string>;
}
