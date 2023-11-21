import { Module } from '@nestjs/common';
import { MailsService } from 'src/mails/mails.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotificationsGateway } from './notifications.gateway';
import { ConfigService } from '@nestjs/config';

@Module(({
  imports: [],
  controllers: [],
  providers: [PrismaService, ConfigService, MailsService, NotificationsGateway],
}))
export class NotificationsModule {}
