import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
declare const AccessTokenGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class AccessTokenGuard extends AccessTokenGuard_base {
    private reflector;
    private readonly configService;
    constructor(reflector: Reflector, configService: ConfigService);
    canActivate(context: ExecutionContext): boolean;
}
export {};
