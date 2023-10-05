import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as sendgrindMail from "@sendgrind/mail";

@Injectable()
export class MailsService {
    constructor(private configService:ConfigService) {
        sendgrindMail.
    }
}
