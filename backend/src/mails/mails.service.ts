import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as sendgrindMail from "@sendgrid/mail";
import { MailInput } from './types';

@Injectable()
export class MailsService {
    constructor(private readonly configService:ConfigService) {
        sendgrindMail.setApiKey(configService.get('SENDGRID_API_KEY'));
    }

    async sendMail(input: MailInput) {
        await sendgrindMail.send({
            from: this.configService.get('SENDGRID_FROM'),
            to: input.to,
            subject: input.subject,
            html: input.html
        });
    }
}
