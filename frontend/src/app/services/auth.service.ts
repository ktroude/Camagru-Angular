import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Credentials, Token } from '../interface/auth.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url:string = 'http://localhost:8080/auth/login';
  constructor(private httpClient: HttpClient) { }

  login(credentials:Credentials): Observable<Token> {
    return this.httpClient.post<Token>(this.url, credentials);
  }
}
