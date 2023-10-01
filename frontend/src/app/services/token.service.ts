import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private readonly tokenName:string = 'token';
  constructor(private router:Router) {}

  saveToken(token: string): void {
    localStorage.setItem(this.tokenName, token);
  }

  isLogged() :boolean {
    const token = localStorage.getItem(this.tokenName);
    return !! token; 
  }

  clearToken(): void {
    localStorage.removeItem(this.tokenName);
    this.router.navigate(['/']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenName);
  }
}
