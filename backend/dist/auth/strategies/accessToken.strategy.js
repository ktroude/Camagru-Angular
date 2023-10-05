"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessTokenStrategy = void 0;
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
const dotenv = require("dotenv");
dotenv.config();
class AccessTokenStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'jwt') {
    constructor() {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.ACCESS_TOKEN_SECRET,
        });
    }
    validate(payload) {
        return payload;
    }
}
exports.AccessTokenStrategy = AccessTokenStrategy;
//# sourceMappingURL=accessToken.strategy.js.map