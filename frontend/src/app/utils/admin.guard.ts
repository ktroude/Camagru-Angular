import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { TokenService } from "../services/token.service";

export const adminGuard: CanActivateFn = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot) => {
    const router: Router = inject(Router);
    const tokenService: TokenService = inject(TokenService);

    if (tokenService.isLogged())
      return true;
    return false; 
};

// a implementer : checker les cookies, checker le jwt, checker le status du mec
//    --> si pas de token rediriger vers /auth
//    --> si token mais pas admin rediriger vers 403
//    --> sinon return true
