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
import { PseudoDto } from './dto/pseudo.dto';
import { EmailDto } from './dto/email.dto';

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

  @Post('update/password')
  @HttpCode(HttpStatus.OK)
  async updatePassword(
    @GetCurrentUserId() userId: number,
    @Body() data: PasswordDto,
  ) {
    return await this.userService.updatePassword(userId, data);
  }

  @Post('update/pseudo')
  @HttpCode(HttpStatus.OK)
  async updatePseudo(
    @GetCurrentUserId() userId: number,
    @Body() data: PseudoDto,
  ) {
    return await this.userService.updatePseudo(userId, data);
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

  @Post('update/pseudo')
  @HttpCode(HttpStatus.OK)
  async updatePseudoByAdmin(@Body() userId: number, @Body() data: PseudoDto) {
    return await this.userService.updatePseudo(userId, data);
  }
  data;
}
