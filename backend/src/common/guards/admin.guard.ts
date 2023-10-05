import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AdminGuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    const accessToken = request.cookies['access_token'];

    if (!accessToken) {
      return false;
    }

    try {
      const decodedToken = jwt.verify(accessToken, 'password');
      request.user = decodedToken;
      const role = decodedToken['role'];
      if (!role || role != 'ADMIN')
        return false;
      return true;
    } catch (error) {
      return false;
    }
  }
}
