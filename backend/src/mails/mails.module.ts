import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailsService } from './mails.service';

@Module({
  providers: [MailsService, ConfigService]
})
export class MailsModule {}
