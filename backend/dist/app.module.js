"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const auth_module_1 = require("./auth/auth.module");
const prisma_module_1 = require("./prisma/prisma.module");
const guards_1 = require("./common/guards");
const core_1 = require("@nestjs/core");
const user_module_1 = require("./user/user.module");
const mails_controller_1 = require("./mails/mails.controller");
const mails_service_1 = require("./mails/mails.service");
const mails_module_1 = require("./mails/mails.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [auth_module_1.AuthModule, prisma_module_1.PrismaModule, user_module_1.UserModule, mails_module_1.MailsModule],
        controllers: [mails_controller_1.MailsController],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: guards_1.AccessTokenGuard,
            },
            mails_service_1.MailsService,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map