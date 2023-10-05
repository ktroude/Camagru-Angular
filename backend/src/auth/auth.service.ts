import {
  Injectable,
  ForbiddenException,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { signinLocalDTO, signupLocalDTO } from './DTO';
import * as bcrypt from 'bcryptjs';
import { Tokens } from './types';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signupLocal(dto: signupLocalDTO, res: Response): Promise<Response> {
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
      const tokens = await this.getTokens(
        newUser.id,
        newUser.username,
        newUser.role,
      );
      await this.updateRefreshTokenHash(newUser.id, tokens.refresh_token);
      res.cookie('access_token', tokens.access_token, { httpOnly: true });
      res.cookie('refresh_token', tokens.refresh_token, { httpOnly: true });
      return res.status(201).send();;
    } catch {
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
    return res.status(200).send();;
  }

  async refreshTokens(userId: number, refreshToken: string, res:Response): Promise<Response> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user || !user.hashedRefreshToken) {
      throw new ForbiddenException('Access denied');
    }
    const matches = bcrypt.compare(refreshToken, user.hashedRefreshToken);
    if (!matches) {
      throw new ForbiddenException('Access denied');
    }
    const tokens = await this.getTokens(user.id, user.username, user.role);
    await this.updateRefreshTokenHash(user.id, tokens.refresh_token);
    res.cookie('access_token', tokens.access_token, { httpOnly: true });
    res.cookie('refresh_token', tokens.refresh_token, { httpOnly: true });
    return res.status(200).send();;
  }

  async hashData(data: string) {
    return await bcrypt.hash(data, 10);
  }

  async getTokens(
    userId: number,
    username: string,
    role: string,
  ): Promise<Tokens> {
    const [accessT, refreshT] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
          role,
        },
        {
          secret: 'password',
          expiresIn: 60 * 15,
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
          role,
        },
        {
          secret: 'password',
          expiresIn: 60 * 60 * 24 * 7,
        },
      ),
    ]);
    return {
      access_token: accessT,
      refresh_token: refreshT,
    };
  }

  async updateRefreshTokenHash(userId: number, refreshToken: string) {
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
}
