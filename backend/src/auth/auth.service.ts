import {
  Injectable,
  ForbiddenException,
  HttpException,
  HttpStatus,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EmailDTO, signinLocalDTO, signupLocalDTO } from './DTO';
import * as bcrypt from 'bcryptjs';
import { Tokens } from './types';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { Response } from 'express';
import { MailsService } from 'src/mails/mails.service';
import { ConfigService } from '@nestjs/config';
import { MailInput } from 'src/mails/types';
import { PasswordDto } from 'src/auth/DTO/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly mailsService: MailsService,
    private readonly configService: ConfigService,
  ) {}

  async signupLocal(dto: signupLocalDTO, res: Response): Promise<Response> {
    try {
      const hash = await this.hashData(dto.password);
      const newUser = await this.prismaService.user.create({
        data: {
          email: dto.email,
          username: dto.username,
          password: hash,
          role: 'USER',
        },
      });
      const tokens = await this.getTokens(
        newUser.id,
        newUser.username,
        newUser.role,
      );
      await this.updateRefreshTokenHash(newUser.id, tokens.refresh_token);
      res.cookie('access_token', tokens.access_token, { httpOnly: true });
      res.cookie('refresh_token', tokens.refresh_token, { httpOnly: true });

      const mailToken = await this.createToken(
        { email: newUser.email },
        {
          secret: this.configService.get('SENGRID_JWT_SECRET'),
          expiresIn: 60 * 60,
        },
      );
      const url = `http://localhost:8080/auth/confirm/${mailToken}`;
      const html = `<p> Click <a href= "${url}"> here </a> to confirm email</p>`;
      await this.mailsService.sendMail({
        to: newUser.email,
        subject: 'Confirm your email',
        html,
      });

      return res.status(201).send();
    } catch(e) {
      console.log(e)
      throw new HttpException(
        'Username or email already taken',
        HttpStatus.CONFLICT,
      );
    }
  }

  async signinLocal(dto: signinLocalDTO, res: Response): Promise<Response> {
    try {
      let user = await this.prismaService.user.findUnique({
        where: {
          username: dto.username,
        },
      });
      if (!user) {
        user = await this.prismaService.user.findUnique({
          where: {
            email: dto.username,
          },
        });
      }
      if (!user) {
        throw new ForbiddenException('Access denied');
      }
      const passwordMatches: boolean = await bcrypt.compare(
        dto.password,
        user.password,
      );
      if (!passwordMatches) {
        throw new ForbiddenException('Access denied');
      }
      const tokens = await this.getTokens(user.id, user.username, user.role);
      await this.updateRefreshTokenHash(user.id, tokens.refresh_token);
      res.cookie('access_token', tokens.access_token, { httpOnly: true });
      res.cookie('refresh_token', tokens.refresh_token, { httpOnly: true });
      return res.status(200).send();
    } catch {
      throw new NotFoundException('This user does not exist in database');
    }
  }

  async logout(userId: number, res: Response) {
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

  async refreshTokens(
    userId: number,
    refreshToken: string,
    res: Response,
  ): Promise<Response> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user || !user.hashedRefreshToken) {
      console.log('Je finis la')
      throw new NotFoundException('User or his refresh token does not exist');
    }
    const matches = bcrypt.compare(refreshToken, user.hashedRefreshToken);
    if (!matches) {
      console.log('Je finis ici')
      throw new ForbiddenException('Access denied');
    }
    const tokens = await this.getTokens(user.id, user.username, user.role);
    await this.updateRefreshTokenHash(user.id, tokens.refresh_token);
    res.cookie('access_token', tokens.access_token, { httpOnly: true });
    res.cookie('refresh_token', tokens.refresh_token, { httpOnly: true });
    return res.status(200).send();
  }

  async confirmEmail(token: string) {
    const match = this.jwtService.verify(token, {
      secret: this.configService.get('SENGRID_JWT_SECRET'),
    });
    if (
      !match ||
      typeof match !== 'object' ||
      !match.email ||
      typeof match.email !== 'string'
    ) {
      throw new UnauthorizedException('Access denied');
    }
    try {
      const user = await this.prismaService.user.findUnique({
        where: {
          email: match.email,
        },
      });
      if (!user) throw new NotFoundException('User does not exist');
      await this.prismaService.user.update({
        where: {
          id: user.id,
        },
        data: {
          isEmailConfirmed: true,
        },
      });
    } catch {
      throw new UnauthorizedException('Access denied');
    }
  }

  async confirmEmailByAdmin(userId: number) {
    try {
      await this.prismaService.user.update({
        where: {
          id: userId,
        },
        data: {
          isEmailConfirmed: true,
        },
      });
    } catch {
      throw new NotFoundException('User does not exist');
    }
  }

  async sendEmailForgotPassword(data: EmailDTO) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: data.email,
      },
    });
    if (!user) throw new NotFoundException('User or does not exist');
    const mailToken = await this.createToken(
      { email: user.email },
      {
        secret: this.configService.get('SENGRID_JWT_SECRET'),
        expiresIn: 60 * 60,
      },
    );
    const url = `http://localhost:4200/auth/recover/password/${mailToken}`;
    const html = `<p> Click <a href= "${url}"> here </a> to change your password</p>`;
    await this.mailsService.sendMail({
      html,
      to: user.email,
      subject: 'Password recover',
    });
  }

  async recoverPassword(token: string, data:PasswordDto) {
    const match = this.jwtService.verify(token, {
      secret: this.configService.get('SENGRID_JWT_SECRET'),
    });
    if (
      !match ||
      typeof match !== 'object' ||
      !match.email ||
      typeof match.email !== 'string'
    ) {
      throw new UnauthorizedException('Access denied');
    }
    try {
      const user = await this.prismaService.user.findUnique({
        where: {
          email: match.email,
        },
      });
      if (!user) throw new NotFoundException('User does not exist');
      await this.prismaService.user.update({
        where: {
          id: user.id,
        },
        data: {
          password: data.password,
        },
      });
    } catch {
      throw new UnauthorizedException('Access denied');
    }
  }

  async getUserAuthority(userId:number){
    const user = await this.prismaService.user.findUnique({
      where: {id: userId},
      select: {role:true}
    });
    if (!user)
      throw new NotFoundException('User not found');
    return user.role;
  }

  // UTILS

  private async hashData(data: string) {
    return await bcrypt.hash(data, 10);
  }

  private async getTokens(
    userId: number,
    username: string,
    role: string,
  ): Promise<Tokens> {
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

  private async updateRefreshTokenHash(userId: number, refreshToken: string) {
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

  private async createToken(payload: object | Buffer, option?: JwtSignOptions) {
    return await this.jwtService.signAsync(payload, option);
  }

  createForgottenPasswordToken() {}
}
