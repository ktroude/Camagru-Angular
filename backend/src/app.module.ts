import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { AccessTokenGuard } from './common/guards';
import { APP_GUARD } from '@nestjs/core';
import { UserModule } from './user/user.module';
import { MailsModule } from './mails/mails.module';
import { ConfigService } from '@nestjs/config';
import { PostModule } from './post/post.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [AuthModule, PrismaModule, UserModule, MailsModule, PostModule, NotificationsModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
    ConfigService,
  ],
})
export class AppModule {}
