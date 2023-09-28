import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";

export const adminGuard: CanActivateFn = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot) => {
    const router = inject(Router);

  return router.navigate(['auth'])
};

// a implementer : checker les cookies, checker le jwt, checker le status du mec
//    --> si pas de token rediriger vers /auth
//    --> si token mais pas admin rediriger vers 403
//    --> sinon return true
