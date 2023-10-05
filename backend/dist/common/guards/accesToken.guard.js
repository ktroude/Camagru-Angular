"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessTokenGuard = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const core_1 = require("@nestjs/core");
const jwt = require("jsonwebtoken");
const config_1 = require("@nestjs/config");
let AccessTokenGuard = class AccessTokenGuard extends (0, passport_1.AuthGuard)('jwt') {
    constructor(reflector, configService) {
        super();
        this.reflector = reflector;
        this.configService = configService;
    }
    canActivate(context) {
        const isPublic = this.reflector.getAllAndOverride('isPublic', [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const accessToken = request.cookies['access_token'];
        if (!accessToken) {
            return false;
        }
        try {
            const decodedToken = jwt.verify(accessToken, this.configService.get('ACCESS_TOKEN_SECRET'));
            request.user = decodedToken;
            return true;
        }
        catch (error) {
            return false;
        }
    }
};
exports.AccessTokenGuard = AccessTokenGuard;
exports.AccessTokenGuard = AccessTokenGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector, config_1.ConfigService])
], AccessTokenGuard);
//# sourceMappingURL=accesToken.guard.js.map