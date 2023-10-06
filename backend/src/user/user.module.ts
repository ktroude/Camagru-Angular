import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MailsModule } from 'src/mails/mails.module';
import { MailsService } from 'src/mails/mails.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [MailsModule],
  providers: [UserService, ConfigService, MailsService, JwtService],
  controllers: [UserController],
})
export class UserModule {}
