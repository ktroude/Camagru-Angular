import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from './types';
import * as bcrypt from 'bcryptjs';
import { EmailDto, PasswordDto, UsernameDto } from './dto';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    ) {}

  async getAllUsers(): Promise<User[]> {
    return await this.prismaService.user.findMany({
      select: {
        id: true,
        email: true,
        username: true,
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
          sendEmail:true,
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
        },
      });
    } catch {
      throw new BadRequestException(
        'Email already taken',
      );
    }
  }

  async updateUsername(userId:number, data:UsernameDto) {
        try {
      return await this.prismaService.user.update({
        where: {
          id: userId,
        },
        data: {
          username: data.username,
        },
      });
    } catch {
      throw new ConflictException(
        'Username already taken',
      );
    }
  }

  async updatePassword(userId: number, data: PasswordDto) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: {
          id: userId
        }
      });
      if (!user)
        throw new NotFoundException('User not found');
      const match = await bcrypt.compare(data.currentPassword, user.password);
      if (!match)
        throw new UnauthorizedException('Wrong password');
      const hash:string = await this.hashData(data.newPassword);
      await this.prismaService.user.update({
        where: {
          id: userId,
        },
        data: {
          password: hash,
        },
      });
      const updatedUser = await this.prismaService.user.findUnique({
        where: {
          id: userId,
        },
      });
      // const mailToken = await this.createToken(
      //   { email: updatedUser.email },
      //   {
      //     secret: this.configService.get('SENGRID_JWT_SECRET'),
      //     expiresIn: 60 * 60,
      //   },
      // );
      // const url = `http://localhost:8080/auth/confirm/${mailToken}`;
      // const html = `<p> Click <a href= "${url}"> here </a> to confirm email</p>`;
      // await this.mailsService.sendMail({
      //   html,
      //   to: updatedUser.email,
      //   subject: 'Confirm your email',
      // });
    } catch {
      throw new NotFoundException(
        'User does not exist',
      );
    }
  }

  async updateEmailPref(userId:number, data:any){
    try {
      const user = await this.prismaService.user.findUnique({
        where: {id:userId}
      });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      const ret = await this.prismaService.user.update({
        where: {id: user.id},
        data: {sendEmail:data.setting},
        select: {sendEmail:true}
      });
      console.log(ret);
      return ret;
    } catch(e) {

    }
  }

  //  UTILS

  private async hashData(data: string) {
    return await bcrypt.hash(data, 10);
  }

  private async createToken(payload: object | Buffer, option?: JwtSignOptions) {
    return await this.jwtService.signAsync(payload, option);
  }
}
