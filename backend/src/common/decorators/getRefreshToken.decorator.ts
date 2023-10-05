import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';


export const GetRefreshToken = createParamDecorator(
  (data: string | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<Request>();
    const refreshToken = request.cookies['refresh_token'];
    if (data && refreshToken) {
      const decodedToken = jwt.verify(refreshToken, 'votre_secret');
      return decodedToken[data];
    }
    return refreshToken;
  },
);
