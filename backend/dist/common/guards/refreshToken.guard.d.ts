import { ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
declare const RefreshTokenGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class RefreshTokenGuard extends RefreshTokenGuard_base {
    private readonly configService;
    constructor(configService: ConfigService);
    canActivate(context: ExecutionContext): boolean;
}
export {};
