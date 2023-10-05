import { ExecutionContext } from '@nestjs/common';
declare const RefreshTokenGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class RefreshTokenGuard extends RefreshTokenGuard_base {
    constructor();
    canActivate(context: ExecutionContext): boolean;
}
export {};
