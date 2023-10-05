import { ClassProvider, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { TokenService } from '../services/token.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private tokenService:TokenService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.tokenService.getToken();
    if (token) {
      let clone = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + token)
      });
      return next.handle(clone).pipe(
        catchError(error => {
          if (error.status === 401) {
            this.tokenService.clearToken();
            // ajouter le refresh token ici (et dans this.tokenService)
            return throwError(() => new Error('Session Expired'));
          }
          return next.handle(request);
        })
      );
    }
    return next.handle(request);
  }
}


export const TokenInterceptorProvider: ClassProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: TokenInterceptor,
  multi: true
}
