import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { AccessTokenGuard } from './common/guards';
import { APP_GUARD } from "@nestjs/core";

@Module({
  imports: [AuthModule, PrismaModule],
  controllers: [],
  providers: [{
    provide: APP_GUARD, 
    useClass: AccessTokenGuard 
  }],
})
export class AppModule {}
