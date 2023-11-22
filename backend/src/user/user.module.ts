import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MailsModule } from 'src/mails/mails.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [MailsModule],
  providers: [UserService, JwtService],
  controllers: [UserController],
})
export class UserModule {}
