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
exports.MailsService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const sendgrindMail = require("@sendgrid/mail");
let MailsService = class MailsService {
    constructor(configService) {
        this.configService = configService;
        sendgrindMail.setApiKey(configService.get('SENDGRID_API_KEY'));
    }
    async sendMail(input) {
        await sendgrindMail.send({
            from: this.configService.get('SENDGRID_FROM'),
            to: input.to,
            subject: input.subject,
            html: input.html
        });
    }
};
exports.MailsService = MailsService;
exports.MailsService = MailsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], MailsService);
//# sourceMappingURL=mails.service.js.map