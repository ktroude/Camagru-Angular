import {
  Controller,
  Get,
  Post,
  UseGuards,
  HttpCode,
  HttpStatus,
  Body,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AdminGuard } from 'src/common/guards';
import { GetCurrentUserId, Public } from 'src/common/decorators';
import { User } from './types';
import { PasswordDto } from './dto/password.dto';
import { EmailDto } from './dto/email.dto';
import { UsernameDto } from './dto';
import { EmailDTO } from 'src/auth/DTO';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  @HttpCode(HttpStatus.OK)
  async getCurrentUserData(@GetCurrentUserId() userId: number): Promise<User> {
    return await this.userService.getCurrentUserData(userId);
  }

  @Post('update/email')
  @HttpCode(HttpStatus.OK)
  async updateEmail(
    @GetCurrentUserId() userId: number,
    @Body() data: EmailDto,
  ) {
    return await this.userService.updateEmail(userId, data);
  }

  @Post('update/username')
  @HttpCode(HttpStatus.OK)
  async updateUsername(
    @GetCurrentUserId() userId: number,
    @Body() data: UsernameDto,
  ) {
    return await this.userService.updateUsername(userId, data);
  }

  @Post('update/password')
  @HttpCode(HttpStatus.OK)
  async updatePassword(
    @GetCurrentUserId() userId: number,
    @Body() data: PasswordDto,
  ) {
    return await this.userService.updatePassword(userId, data);
  }

  @Post('update/email/setting')
  @HttpCode(HttpStatus.OK)
  async updateEmailPref(
    @GetCurrentUserId() userId: number,
    @Body() data: any,
  ) {
    return await this.userService.updateEmailPref(userId, data);
  }

  // ADMIN ENDPOINT

  @UseGuards(AdminGuard)
  @Get('all')
  @HttpCode(HttpStatus.OK)
  async getAllUsers(): Promise<User[]> {
    console.log('endpoint activated')
    return await this.userService.getAllUsers();
  }

  @UseGuards(AdminGuard)
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getUserDataById(@Param('id')userId: string): Promise<User> {
    return await this.userService.getUserDataById(userId);
  }

  @UseGuards(AdminGuard)
  @Post('update/email/admin')
  @HttpCode(HttpStatus.OK)
  async updateEmailByAdmin(@Body() data: {userId:string, email:EmailDTO}) {
    const userId:number = parseInt(data.userId);
    return await this.userService.updateEmail(userId, data.email);
  }

  @UseGuards(AdminGuard)
  @Post('update/pref/admin')
  @HttpCode(HttpStatus.OK)
  async updateEmailPrefByAdmin(@Body() data: {setting:boolean, userId:string}) {
    const userId:number = parseInt(data.userId);
    return await this.userService.updateEmailPref(userId, data);
  }

  @UseGuards(AdminGuard)
  @Post('update/confirm/admin')
  @HttpCode(HttpStatus.OK)
  async updateEmailConfirmByAdmin(@Body() data: {setting:boolean, userId:string}) {
    const userId:number = parseInt(data.userId);
    return await this.userService.updateEmailConfirmation(userId, data.setting);
  }

  @UseGuards(AdminGuard)
  @Post('update/username/admin')
  @HttpCode(HttpStatus.OK)
  async updateUsernameByAdmin(@Body() data: {username:UsernameDto, userId:string}) {
    const userId:number = parseInt(data.userId);
    return await this.userService.updateUsername(userId, data.username);
  }

  @UseGuards(AdminGuard)
  @Post('update/password/admin')
  @HttpCode(HttpStatus.OK)
  async updatePasswordByAdmin(
    @Body() userId: number,
    @Body() data: PasswordDto,
  ) {
    return await this.userService.updatePassword(userId, data);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deletUser(
    @Param('id') userId: string,
  ) {
    console.log('user == ', userId)
    const id:number = parseInt(userId, 10);
    console.log('id == ', id)
    return await this.userService.deleteUser(id);
  }
}
