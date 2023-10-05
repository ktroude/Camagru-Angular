import { ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
declare const AdminGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class AdminGuard extends AdminGuard_base {
    private readonly configService;
    constructor(configService: ConfigService);
    canActivate(context: ExecutionContext): boolean;
}
export {};
