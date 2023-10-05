import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { AccessTokenGuard } from './common/guards';
import { APP_GUARD } from '@nestjs/core';
import { UserModule } from './user/user.module';
import { MailsModule } from './mails/mails.module';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [AuthModule, PrismaModule, UserModule, MailsModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
    ConfigService
  ],
})
export class AppModule {}
