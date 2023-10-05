import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { AccessTokenGuard } from './common/guards';
import { APP_GUARD } from '@nestjs/core';
import { UserModule } from './user/user.module';
import { MailsController } from './mails/mails.controller';
import { MailsService } from './mails/mails.service';
import { MailsModule } from './mails/mails.module';
import { MailsModule } from './mails/mails.module';

@Module({
  imports: [AuthModule, PrismaModule, UserModule, MailsModule],
  controllers: [MailsController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
    MailsService,
  ],
})
export class AppModule {}
