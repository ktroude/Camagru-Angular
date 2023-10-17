import {
  Controller,
  Get,
  Post,
  UseGuards,
  HttpCode,
  HttpStatus,
  Body,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AdminGuard } from 'src/common/guards';
import { GetCurrentUserId } from 'src/common/decorators';
import { User } from './types';
import { PasswordDto } from './dto/password.dto';
import { EmailDto } from './dto/email.dto';
import { UsernameDto } from './dto';

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

  // ADMIN ENDPOINT

  @UseGuards(AdminGuard)
  @Get('all')
  @HttpCode(HttpStatus.OK)
  async getAllUsers(): Promise<User[]> {
    return await this.userService.getAllUsers();
  }

  @UseGuards(AdminGuard)
  @Post('update/email')
  @HttpCode(HttpStatus.OK)
  async updateEmailByAdmin(@Body() userId: number, @Body() data: EmailDto) {
    return await this.userService.updateEmail(userId, data);
  }

  @UseGuards(AdminGuard)
  @Post('update/password')
  @HttpCode(HttpStatus.OK)
  async updatePasswordByAdmin(
    @Body() userId: number,
    @Body() data: PasswordDto,
  ) {
    return await this.userService.updatePassword(userId, data);
  }

}
