import { Module, OnModuleInit } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MailsModule } from 'src/mails/mails.module';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { EmailDTO } from 'src/auth/DTO';

@Module({
  imports: [MailsModule],
  providers: [UserService, JwtService, PrismaService],
  controllers: [UserController],
})
export class UserModule implements OnModuleInit {
  
  constructor(private userService:UserService, private prismaService:PrismaService){}

  async onModuleInit() {
    await this.createAdmin();
  }

    async createAdmin() {
    const check = await this.prismaService.user.findMany({
       where: {role: "ADMIN"}}
      );
    if (check.length > 0)
      return ;
    const hash = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
    const admin = await this.prismaService.user.create({
      data: {
        email: process.env.ADMIN_EMAIL,
        username: process.env.ADMIN_USERNAME,
        password: hash,
        role: "ADMIN",
        isEmailConfirmed:true,
        sendEmail:false,
      }
    });
  }

}
