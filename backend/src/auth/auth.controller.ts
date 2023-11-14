import {
  Body,
  Controller,
  Post,
  Res,
  UseGuards,
  Param,
  Get,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { EmailDTO, signinLocalDTO, signupLocalDTO } from './DTO';
import { Response } from 'express';
import { AdminGuard, RefreshTokenGuard } from 'src/common/guards';
import { GetCurrentUserId, Public } from 'src/common/decorators';
import { GetRefreshToken } from 'src/common/decorators/getRefreshToken.decorator';
import { PasswordDto } from 'src/auth/DTO/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('local/signup')
  signupLocal(
    @Body() dto: signupLocalDTO,
    @Res() res: Response,
  ): Promise<Response> {
    console.log(dto)
    return this.authService.signupLocal(dto, res);
  }
  
  @Public()
  @Post('local/signin')
  signinLocal(
    @Body() dto: signinLocalDTO,
    @Res() res: Response,
    ): Promise<Response> {
    console.log('DTO ==== ', dto);
    return this.authService.signinLocal(dto, res);
  }

  @Post('logout')
  logout(
    @GetCurrentUserId() userId: number,
    @Res() res: Response,
  ): Promise<Response> {
    return this.authService.logout(userId, res);
  }

  @Post('refresh')
  @Public()
  @UseGuards(RefreshTokenGuard)
  refreshTokens(
    @GetCurrentUserId() userId: number,
    @GetRefreshToken() refreshToken: string,
    @Res() res: Response,
  ): Promise<Response> {
    return this.authService.refreshTokens(userId, refreshToken, res);
  }

  @Get('confirm/:token')
  @Public()
  @HttpCode(HttpStatus.OK)
  confirmEmail(@Param('token') token: string) {
    return this.authService.confirmEmail(token);
  }

  @Post('recover/send/email')
  @Public()
  @HttpCode(HttpStatus.OK)
  sendEmailForgotPassword(@Body() email: EmailDTO) {
    return this.authService.sendEmailForgotPassword(email);
  }

  @Post('recover/password/:token')
  @Public()
  @HttpCode(HttpStatus.OK)
  recoverPassword(@Param('token') token:string, @Body() data:PasswordDto) {
    return this.authService.recoverPassword(token, data);
  }

  @Get('verify/token')
  @HttpCode(HttpStatus.OK)
  verifyAccessTokenValidity(): string {
    return 'Access token is valid';
  }

  @Post('confirm/admin/:id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AdminGuard)
  confirmEmailByAdmin(@Param('id') userId: number) {
    return this.authService.confirmEmailByAdmin(userId);
  }
}