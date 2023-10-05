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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const DTO_1 = require("./DTO");
const guards_1 = require("../common/guards");
const decorators_1 = require("../common/decorators");
const getRefreshToken_decorator_1 = require("../common/decorators/getRefreshToken.decorator");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async signupLocal(dto, res) {
        return await this.authService.signupLocal(dto, res);
    }
    signinLocal(dto, res) {
        return this.authService.signinLocal(dto, res);
    }
    logout(userId, res) {
        return this.authService.logout(userId, res);
    }
    refreshTokens(userId, refreshToken, res) {
        console.log(refreshToken);
        return this.authService.refreshTokens(userId, refreshToken, res);
    }
    sendEmailForgotPassword(email) {
        return this.authService.sendEmailForgotPassword(email);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Post)('local/signup'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [DTO_1.signupLocalDTO, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signupLocal", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Post)('local/signin'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [DTO_1.signinLocalDTO, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signinLocal", null);
__decorate([
    (0, common_1.Post)('logout'),
    __param(0, (0, decorators_1.GetCurrentUserId)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "logout", null);
__decorate([
    (0, common_1.Post)('refresh'),
    (0, decorators_1.Public)(),
    (0, common_1.UseGuards)(guards_1.RefreshTokenGuard),
    __param(0, (0, decorators_1.GetCurrentUserId)()),
    __param(1, (0, getRefreshToken_decorator_1.GetRefreshToken)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "refreshTokens", null);
__decorate([
    (0, common_1.Post)('recover/send/email'),
    (0, decorators_1.Public)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [DTO_1.EmailDTO]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "sendEmailForgotPassword", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map