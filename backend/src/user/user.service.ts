import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from './types';
import * as bcrypt from 'bcryptjs';
import { EmailDto, PasswordDto, PseudoDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async getAllUsers(): Promise<User[]> {
    return await this.prismaService.user.findMany({
      select: {
        id: true,
        email: true,
        username: true,
        pseudo: true,
      },
    });
  }

  async getCurrentUserData(userId: number): Promise<User> {
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
    } catch {
      throw new NotFoundException('User not found');
    }
  }

  async updateEmail(userId: number, data: EmailDto) {
    try {
      return await this.prismaService.user.update({
        where: {
          id: userId,
        },
        data: {
          email: data.email,
          isEmailConfirmed: false
        },
      });
    } catch {
      throw new BadRequestException(
        'New email must be an email or user does not exist',
      );
    }
  }

  async updatePassword(userId: number, data: PasswordDto) {
    try {
      const hash: string = await this.hashData(data.password);
      return await this.prismaService.user.update({
        where: {
          id: userId,
        },
        data: {
          password: hash,
        },
      });
    } catch {
      throw new BadRequestException(
        'New password must be a string or user does not exist',
      );
    }
  }

  async updatePseudo(userId: number, data: PseudoDto) {
    try {
      return await this.prismaService.user.update({
        where: {
          id: userId,
        },
        data: {
          pseudo: data.pseudo,
        },
      });
    } catch {
      throw new BadRequestException(
        'New pseudo must be string or user does not exist',
      );
    }
  }

  async hashData(data: string) {
    return await bcrypt.hash(data, 10);
  }
}
