"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetRefreshToken = void 0;
const common_1 = require("@nestjs/common");
const jwt = require("jsonwebtoken");
exports.GetRefreshToken = (0, common_1.createParamDecorator)((data, context) => {
    const request = context.switchToHttp().getRequest();
    const refreshToken = request.cookies['refresh_token'];
    if (data && refreshToken) {
        const decodedToken = jwt.verify(refreshToken, 'votre_secret');
        return decodedToken[data];
    }
    return refreshToken;
});
//# sourceMappingURL=getRefreshToken.decorator.js.map