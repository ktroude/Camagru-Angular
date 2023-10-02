import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Credentials, Token } from "src/app/interface/auth.interface";
import { AuthService } from "src/app/services/auth.service";
import { TokenService } from "src/app/services/token.service";

@Component({
  selector: "app-login",
  template: `
    <body>
      <header>
        <img
          class="logo"
          src="assets/img/photos_660489.png"
          alt="logo"
          (click)="this.redirect('auth/login')"
        />
        <h1 class="title">CAMAGRU</h1>
      </header>
      <div class="form_container">
        <form name="auth_form" #f="ngForm" (ngSubmit)="f.form.valid && onSubmit()">
          <label for="username">Username</label>
          <input
          type="text"
          name="username"
          id="username"
          autocomplete="off"
          [(ngModel)]="form.username"
          #username="ngModel"
          required
          />
          <p class="form_error" *ngIf="username.errors && username.errors['required'] && f.submitted">Username is required</p>
          <label class="pw_input" for="password">Password</label>
          <input
          type="password"
          name="password"
          id="password"
          autocomplete="off"
          [(ngModel)]="form.password"
          #password="ngModel"
          required
          minlength="8"
          />
          <p class="form_error" *ngIf="password.errors && password.errors['required'] && f.submitted">Password is required</p>
          <p class="form_error" *ngIf="password.errors && password.errors['minlengt'] && f.submitted">Password must be at least 8 characters</p>
          <button>Login</button>
          <a (click)="redirect('/auth/recover')">Password forgot?</a>
          <p class="form_error" *ngIf="match === false" style="margin-top: 100px;">
            Username or password incorect !
          </p>
        </form>
      </div>
      <div class="login_button">
        <button (click)="this.redirect('auth/register')">Sign In</button>
      </div>
      <footer>
        <p>© 2023 Camagru - All wrongs reserved</p>
      </footer>
    </body>
  `,
  styleUrls: ["./login.css"],
})
export class LoginComponent {
  form:Credentials = {
    username: "",
    password: "",
  };

  match:boolean = true;

  constructor(
    private router: Router,
    private authService: AuthService,
    private tokenService: TokenService,
    ) {}

  redirect(path: string) {
    this.router.navigate([path]);
  }

onSubmit() {
  console.log(this.form);
  this.authService.login(this.form).subscribe({
    next: (data: Token) => {
      if (data.token) {
        this.match = true;
        this.tokenService.saveToken(data.token);
        this.router.navigate([''])
      }
      else {
        this.match = false;
      }
    },
    error: (err: any) => {
      console.log(err);
      this.match = false;
    }
  });
}






}
