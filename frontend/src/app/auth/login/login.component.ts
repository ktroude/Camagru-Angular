import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import axios from "axios";
import { Credentials } from "src/app/interface/auth.interface";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-login",
  template: `
    <body>
    <header>
      <div class="header_container">
        <img
        class="logo"
        src="assets/img/global.png"
        alt="logo"
        (click)="this.redirect('/')"
        />
      </div>
      <div class="title_container">
        <h1 class="title">CAMAGRU</h1>
      </div>
        <div class="button_container">
          <img class="icons" src="assets/img/notification-bell.png" alt="Notifications" *ngIf="this.logged === true">  
          <img class="icons" src="assets/img/spanner.png" alt="Settings" (click)="this.logout()"/>
          <img class="icons" src="assets/img/power.png" alt="Log out" (click)="this.redirect('/profile')" />
        </div>
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
        <p>© 2023 Camagru - No rights reserved</p>
      </footer>
    </body>
  `,
  styleUrls: [
    "./login.css",
    "./header.css"
    
  ],
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
    private httpClient: HttpClient
    ) {}

  logged:boolean = false;

    ngOnInit() {
    this.isLogged();
  }

  async logout() {
    await axios.post('http://localhost:8080/auth/logout');
    this.redirect('/auth/login')
  }

  async isLogged() {
    try {
      const response = await axios.get('http://localhost:8080/auth/verifiy/token')
      if (response.status === 200)
        this.logged = true;
    } catch {
      this.logged = false;
    }
  }

  redirect(path: string) {
    this.router.navigate([path]);
  }

onSubmit() {
  this.authService.login(this.form).subscribe({
    next: (response) => {
       if (response.status === 200) {
        this.match = true;
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
