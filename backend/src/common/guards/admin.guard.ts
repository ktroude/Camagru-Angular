import { Injectable, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AdminGuard extends AuthGuard('jwt') {
  constructor(private readonly configService:ConfigService) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    const accessToken = request.cookies['access_token'];

    if (!accessToken) {
      return false;
    }

    try {
      const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
      request.user = decodedToken;
      const role = decodedToken['role'];
      if (!role || role != 'ADMIN') {
        return false;
      }
      return true;
    } catch (error) {
      return false;
    }
  }
}
