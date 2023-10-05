import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AccessTokenStrategy, RefreshTokenStrategy } from './strategies';
import { JwtModule } from '@nestjs/jwt';
import { MailsModule } from 'src/mails/mails.module';
import { MailsService } from 'src/mails/mails.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [JwtModule.register({}), MailsModule],
  providers: [
    AuthService,
    AccessTokenStrategy,
    MailsService,
    RefreshTokenStrategy,
    ConfigService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
