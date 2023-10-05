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
exports.RefreshTokenGuard = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const passport_1 = require("@nestjs/passport");
const jwt = require("jsonwebtoken");
let RefreshTokenGuard = class RefreshTokenGuard extends (0, passport_1.AuthGuard)('jwt-refresh') {
    constructor(configService) {
        super();
        this.configService = configService;
    }
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const refreshToken = request.cookies['refresh_token'];
        if (!refreshToken) {
            return false;
        }
        try {
            const decodedToken = jwt.verify(refreshToken, this.configService.get('REFRESH_TOKEN_SECRET'));
            request.user = decodedToken;
            return true;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }
};
exports.RefreshTokenGuard = RefreshTokenGuard;
exports.RefreshTokenGuard = RefreshTokenGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], RefreshTokenGuard);
//# sourceMappingURL=refreshToken.guard.js.map