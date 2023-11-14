import { Component } from "@angular/core";
import { Router } from "@angular/router";
import axios from "axios";

@Component({
  selector: "app-profile",
  template: `
    <div class="settings_container">
      <div class="title">
        <h2>Settings</h2>
      </div>
      <div class="container">
        <div class="side_container">
          <img
            src="assets/img/playLeft.png"
            alt="left arrow"
            (click)="prevStep()"
          />
        </div>
        <div *ngIf="currentStep === 0" class="info_container">
          <div class="label_container">
            <label for="username">Current username: {{ this.username }}</label>
            <input
              type="text"
              id="username"
              placeholder="New Username"
              [(ngModel)]="newUsername"
              name="newUsername"
            />
          </div>
          <div class="label_container">
            <label for="email">Current email: {{ this.email }}</label>
            <input
              type="text"
              id="email"
              placeholder="New Email"
              [(ngModel)]="newEmail"
            />
          </div>
          <div class="error_container">
            <p *ngIf="this.errorMsg.length">{{ this.errorMsg }}</p>
          </div>
          <button (click)="changeUsernameEmail()">Confirm changes</button>
        </div>
        <div *ngIf="currentStep === 1" class="info_container">
          <div class="label_container">
            <label for="currentPassword">Current Password</label>
            <input
              type="password"
              id="currentPassword"
              placeholder="Current Password"
              [(ngModel)]="oldPassword"
            />
          </div>
          <div class="label_container">
            <label for="newPassword">New Password</label>
            <input
              type="password"
              id="newPassword"
              placeholder="New Password"
              [(ngModel)]="newPassword"
            />
          </div>
          <div class="error_container">
            <p *ngIf="this.errorMsg.length">{{ this.errorMsg }}</p>
          </div>
          <button (click)="changePassword()">Confirm changes</button>
        </div>
        <div class="side_container">
          <img
            src="assets/img/playRight.png"
            alt="right arrow"
            (click)="nextStep()"
          />
        </div>
      </div>
    </div>
  `,
  styleUrls: ["./profile.css"],
})
export class ProfileComponent {
  id: number;
  email: string;
  username: string;
  posts: any[] = [];

  newUsername: string = "";
  newEmail: string = "";
  oldPassword: string = "";
  newPassword: string = "";

  errorMsg: string = "";
  currentStep: number = 0;

  constructor(private router: Router) {}

  async ngOnInit() {
    await this.getUserData();
    console.log("username ===", this.username);
  }

  redirect(path: string) {
    this.router.navigate([path]);
  }

  async getUserData() {
    try {
      const response: any = await axios.get("http://localhost:8080/user/me", {
        withCredentials: true,
      });
      this.id = response.data.id;
      this.email = response.data.email;
      this.username = response.data.username;
    } catch (e: any) {
      if (e.code === "ERR_BAD_REQUEST") {
        try {
          console.log("Token expired or invalid. Refreshing...");
          const retry = await axios.post(
            "http://localhost:8080/auth/refresh",
            null,
            {
              withCredentials: true,
            }
          );
          if (retry.status !== 200) this.redirect("/auth/required");
          else {
            const resp: any = await axios.get("http://localhost:8080/user/me", {
              withCredentials: true,
            });
            this.id = resp.data.id;
            this.email = resp.data.email;
            this.username = resp.data.username;
          }
        } catch (e: any) {
          console.error(e);
        }
      }
    }
  }

  async getMyPost() {
    try {
      const response = await axios.get("http://localhost:8080/post/me", {
        withCredentials: true,
      });
      this.posts = response.data;
    } catch (e: any) {
      if (e.code === "ERR_BAD_REQUEST") {
        try {
          const retry = await axios.post(
            "http://localhost:8080/auth/refresh",
            null,
            {
              withCredentials: true,
            }
          );
          if (retry.status !== 200) this.redirect("/auth/required");
          else {
            const resp = await axios.get("http://localhost:8080/post/me", {
              withCredentials: true,
            });
            this.posts = resp.data;
          }
        } catch (e) {
          console.log(e);
        }
      }
      console.log(e);
    }
  }

  nextStep() {
    this.errorMsg = "";
    if (this.currentStep < 1) {
      this.currentStep++;
    } else this.currentStep = 0;
  }

  prevStep() {
    this.errorMsg = "";
    if (this.currentStep > 0) {
      this.currentStep--;
    } else this.currentStep = 1;
  }

  async changeUsernameEmail() {
    this.errorMsg = "";
    if (this.newUsername) await this.changeUsername();
    if (this.newEmail) await this.changeEmail();
    await this.getUserData();
  }

  async changeUsername() {
    if (!this.newUsername) return;
    if (this.newUsername.length < 3 || this.newUsername.length > 20) {
      this.errorMsg = "Username must be between 8 and 20 characters";
      return;
    }
    if (this.isAlpha(this.newUsername) === false) {
      this.errorMsg = "Username must contain only letters";
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:8080/user/update/username",
        { username: this.newUsername },
        { withCredentials: true }
      );
      if (response.status === 200) return;
    } catch (e: any) {
      if (e.code === "ERR_BAD_REQUEST") {
        try {
          const retry = await axios.post(
            "http://localhost:8080/auth/refresh",
            null,
            {
              withCredentials: true,
            }
          );
          if (retry.status !== 200) this.redirect("/auth/required");
          const resp = await axios.post(
            "http://localhost:8080/user/update/username",
            { username: this.newUsername },
            { withCredentials: true }
          );
          if (resp.status === 200) return;
          else this.errorMsg = "Something went wrong, please try again later";
        } catch (e: any) {
          if (e.code === 409)
            this.errorMsg =
              "Username already in use, please choose an other one";
        }
      } else if (e.code === 409)
        this.errorMsg = "Username already in use, please choose an other one";
      else this.errorMsg = "Something went wrong, please try again later";
    }
  }

  async changeEmail() {
    if (!this.newEmail) return;
    if (this.isValidEmail(this.newEmail) === false) {
      this.errorMsg = "Email must be an email";
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:8080/user/update/email",
        { email: this.newEmail },
        { withCredentials: true }
      );
      if (response.status === 200) return;
    } catch (e: any) {
      if (e.code === "ERR_BAD_REQUEST") {
        try {
          const retry = await axios.post(
            "http://localhost:8080/auth/refresh",
            null,
            { withCredentials: true }
          );
          if (retry.status !== 200) this.redirect("/auth/required");
          const resp = await axios.post(
            "http://localhost:8080/user/update/email",
            { email: this.newEmail },
            { withCredentials: true }
          );
          if (resp.status === 200) return;
        } catch (e) {
          console.error(e);
        }
      } else if (e.code === 409)
        this.errorMsg = "Email already in use, please choose an other one";
      else this.errorMsg = "Something went wrong, please try again later";
    }
  }

  async changePassword() {
    if (!this.newPassword || !this.oldPassword) return;
    if (this.newPassword.length < 8 || this.newPassword.length > 20) {
      this.errorMsg =
        "The new password must be between 8 and 20 characters long";
      return;
    }
    if (
      (this.hasLowerCase(this.newPassword) &&
        this.hasUpperCase(this.newPassword) &&
        this.hasDigit(this.newPassword)) === false
    ) {
      this.errorMsg =
        "The new password must contain at least one uppercase letter, one lowercase letter and one digit";
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:8080/user/update/password",
        {
          currentPassword: this.oldPassword,
          newPassword: this.newPassword,
        },
        { withCredentials: true }
      );
      if (response.status === 200) {
        this.errorMsg = "";
        return;
      }
    } catch (e: any) {
      if (e.code === "ERR_BAD_REQUEST") {
        try {
          const retry = await axios.post(
            "http://localhost:8080/auth/refresh",
            null,
            {
              withCredentials: true,
            }
          );
          if (retry.status !== 200) this.redirect("auth/required");
          const resp = await axios.post(
            "http://localhost:8080/user/update/password",
            {
              currentPassword: this.oldPassword,
              newPassword: this.newPassword,
            },
            { withCredentials: true }
          );
          if (resp.status === 200) {
            this.errorMsg = "";
            return;
          }
        } catch (e) {
          console.error(e);
        }
      } else if (e.code === 'ERR_UNAUTHORIZED') {
        this.errorMsg = "Your current password is false, please try again";
        return;
      }
    }
  }

  isAlpha(input: string): boolean {
    const regex = /^[a-zA-Z]+$/;
    return regex.test(input);
  }

  isValidEmail(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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
