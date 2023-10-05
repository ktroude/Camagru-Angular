import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Request } from 'express'

export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {

    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'password',
            passReqToCallback: true,
        });
    }

    validate(req: Request ,payload:any){
        const refreshToken = req.get('Authorization').replace('Bearer', '').trim();
        return {
            ...payload,
            refreshToken,
        }
    }
}