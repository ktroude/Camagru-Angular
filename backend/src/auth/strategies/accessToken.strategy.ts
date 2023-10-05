import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import * as dotenv from 'dotenv';
dotenv.config();

export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {

    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.ACCESS_TOKEN_SECRET,
        });
    }

    validate(payload:any){
        return payload;
    }
}