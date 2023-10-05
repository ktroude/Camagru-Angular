import { ConfigService } from '@nestjs/config';
import { MailInput } from './types';
export declare class MailsService {
    private readonly configService;
    constructor(configService: ConfigService);
    sendMail(input: MailInput): Promise<void>;
}
