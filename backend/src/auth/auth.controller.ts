import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signinLocalDTO, signupLocalDTO } from './DTO';
import { Response } from 'express';
import { RefreshTokenGuard } from 'src/common/guards';
import { GetCurrentUserId, Public } from 'src/common/decorators';
import { GetRefreshToken } from 'src/common/decorators/getRefreshToken.decorator';

@Controller('auth')
export class AuthController {

    constructor(
        private authService:AuthService,
    ) {}

    @Public()
    @Post('local/signup')
    async signupLocal(@Body() dto:signupLocalDTO, @Res() res: Response):Promise<Response> {
        return await this.authService.signupLocal(dto, res);
    }

    @Public()
    @Post('local/signin')
    signinLocal(@Body() dto:signinLocalDTO, @Res() res: Response): Promise<Response>{
        return this.authService.signinLocal(dto, res);
    }

    @Post('logout')
    logout(@GetCurrentUserId() userId: number, @Res() res:Response){
        return this.authService.logout(userId, res);
    }

    @Post('refresh')
    @Public()
    @UseGuards(RefreshTokenGuard)
    refreshTokens(@GetCurrentUserId() userId: number, @GetRefreshToken() refreshToken:string, @Res() res:Response){
        console.log(refreshToken)
        return this.authService.refreshTokens(userId, refreshToken, res);
    }

}
