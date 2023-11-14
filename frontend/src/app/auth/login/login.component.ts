import { Component } from "@angular/core";
import { Router } from "@angular/router";
import axios from "axios";
import { Credentials } from "src/app/interface/auth.interface";

@Component({
  selector: "app-login",
  template: `
    <body>
      <header>
        <div class="header_container"></div>
        <div class="title_container">
          <h1 class="title">CAMAGRU</h1>
        </div>
      </header>
      <div class="container">
        <div class="form_container">
          <form
            name="auth_form"
            #f="ngForm"
            (ngSubmit)="f.form.valid && onSubmit()"
          >
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
            <p
              class="form_error"
              *ngIf="
                username.errors && username.errors['required'] && f.submitted
              "
            >
              Username is required
            </p>
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
            <p
              class="form_error"
              *ngIf="
                password.errors &&
                (password.errors['required'] || password.errors['minlength']) &&
                f.submitted
              "
            >
              Password must be at least 8 characters long
            </p>
            <button>Login</button>
            <a (click)="redirect('/auth/recover')">Password forgot?</a>
            <p
              class="form_error"
              *ngIf="match === false"
              style="margin-top: 100px;"
            >
              Username or password incorect !
            </p>
          </form>
        </div>
        <div class="login_button">
          <button (click)="this.redirect('auth/register')">Sign In</button>
        </div>
      </div>
      <div class="footer">
        <p>© 2023 Camagru - No rights reserved</p>
      </div>
    </body>
  `,
  styleUrls: ["./login.css", "./header.css"],
})
export class LoginComponent {
  form: Credentials = {
    username: "",
    password: "",
  };

  match: boolean = true;

  constructor(private router: Router) {}

  logged: boolean = false;

  ngOnInit() {
    this.isLogged();
  }

  async logout() {
    try {
      await axios.post("http://localhost:8080/auth/logout", null, {
        withCredentials: true,
      });
      this.redirect("/auth/login");
    } catch (e) {
      this.redirect("/auth/login");
    }
  }

  async isLogged() {
    try {
      const response = await axios.get(
        "http://localhost:8080/auth/verify/token",
        { withCredentials: true }
      );
      if (response.status === 200) this.logged = true;
    } catch {
      this.logged = false;
    }
  }

  redirect(path: string) {
    this.router.navigate([path]);
  }

  async onSubmit() {
    try {
      const response = await axios.post(
        "http://localhost:8080/auth/local/signin",
        this.form,
        { withCredentials: true }
      );
      console.log("rep ==", response.status);
      if (response.status === 200) {
        this.match = true;
        this.router.navigate([""]);
      } else {
        this.match = false;
      }
    } catch (e) {
      this.match = false;
    }
  }
}
