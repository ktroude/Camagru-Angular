import { Injectable, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class RefreshTokenGuard extends AuthGuard('jwt-refresh') {
  constructor(private readonly configService:ConfigService) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    const refreshToken = request.cookies['refresh_token'];

    if (!refreshToken) {
      return false;
    }

    try {
      const decodedToken = jwt.verify(refreshToken, this.configService.get('REFRESH_TOKEN_SECRET'));
      request.user = decodedToken;
      return true;
    } catch (error) {
        console.log(error)
      return false;
    }
  }
}
