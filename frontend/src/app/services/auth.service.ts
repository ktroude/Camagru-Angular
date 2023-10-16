import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Credentials } from '../interface/auth.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url:string = 'http://localhost:8080/auth/local/signin';
  constructor(private httpClient: HttpClient) { }

  login(credentials:Credentials): Observable<any> {
    return this.httpClient.post<any>(this.url, credentials);
  }
}
