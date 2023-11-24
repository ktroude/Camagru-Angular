import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import axios from "axios";

@Component({
  selector: "app-new-password",
  template: `
    <header>
      <div class="header_container"></div>
      <div class="title_container">
        <h1 class="title" (click)="redirect('/auth')">CAMAGRU</h1>
      </div>
    </header>
    <div class="container" *ngIf="fatalError.length">
      <h2>{{ fatalError }}</h2>
    </div>
    <div class="container" *ngIf="fatalError.length === 0">
      <h2>Welcome back {{ username }}</h2>
      <p>Type your new new password:</p>
      <input type="password" [(ngModel)]="newPassword" />

      <p>confirm your new password:</p>
      <input type="password" [(ngModel)]="passwordConfirm" />
      <div class="error">
        <p *ngIf="errorMsg.length === 0"></p>
        <p *ngIf="errorMsg.length">{{ errorMsg }}</p>
      </div>

      <button (click)="changePassword()">Change password</button>
    </div>
  `,
  styleUrls: ["./new-password.css"],
})
export class NewPasswordComponent implements OnInit {
  token: string | null;
  errorMsg: string = "";
  fatalError: string = "";
  url: string = "http://localhost:8080/";
  username: string;

  newPassword: string;
  passwordConfirm: string;

  constructor(private router: Router, private route: ActivatedRoute) {}

  async ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.token = params.get("token");
    });
    if (!this.token) {
      this.fatalError =
        "Token null or expired, please send an other 'forgotten password' request";
      return;
    }
    await this.checkToken();
  }

  redirect(url: string) {
    this.router.navigate([url]);
  }

  async checkToken() {
    try {
      const response = await axios.get(
        this.url + "auth/recover/password/check/" + this.token
      );
      this.username = response.data.username;
    } catch (e) {
      this.fatalError =
        "Token null or expired, please send an other 'forgotten password' request";
    }
  }

  async changePassword() {
    this.errorMsg = this.checkPassword();
    if (this.errorMsg.length) return;
    this.errorMsg = this.checkPasswordMatch();
    if (this.errorMsg.length) return;
    try {
      await axios.post(
        this.url + "auth/recover/password/" + this.token,
        {password:this.newPassword}
      );
      this.redirect('auth/')
    } catch (e) {
      console.error(e);
    }
  }

  checkPassword(): string {
    if (this.newPassword.length < 8 || this.newPassword.length > 20)
      return "Password must be between 8 and 20 characters long";
    if (
      (this.hasLowerCase(this.newPassword) &&
        this.hasUpperCase(this.newPassword) &&
        this.hasDigit(this.newPassword)) === false
    )
      return "Password must contain at least one uppercase letter, one lowercase letter and one digit";
    return "";
  }

  checkPasswordMatch(): string {
    if (this.newPassword !== this.passwordConfirm)
      return "Passwords do not match";
    return "";
  }

  hasLowerCase(str: string) {
    return /[a-z]/.test(str);
  }

  hasUpperCase(str: string) {
    return /[A-Z]/.test(str);
  }

  hasDigit(str: string) {
    return /\d/.test(str);
  }
}
