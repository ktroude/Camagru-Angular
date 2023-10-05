import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class RefreshTokenGuard extends AuthGuard('jwt-refresh') {
  constructor() {
    super();
  }

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    const refreshToken = request.cookies['refresh_token'];

    console.log('token == ', refreshToken)
    if (!refreshToken) {
      return false;
    }

    try {
      const decodedToken = jwt.verify(refreshToken, 'password');
      console.log('decode == ', decodedToken)
      request.user = decodedToken;
      return true;
    } catch (error) {
        console.log(error)
      return false;
    }
  }
}
