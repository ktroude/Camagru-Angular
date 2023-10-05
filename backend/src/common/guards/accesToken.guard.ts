import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AccessTokenGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector, private readonly configService:ConfigService) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const accessToken = request.cookies['access_token'];

    if (!accessToken) {
      return false;
    }

    try {
      const decodedToken = jwt.verify(accessToken, this.configService.get('ACCESS_TOKEN_SECRET'));
      request.user = decodedToken;
      return true;
    } catch (error) {
      return false;
    }
  }
}
