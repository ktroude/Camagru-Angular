import { Component } from "@angular/core";
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
        <div   *ngIf="currentStep === 0" class="info_container">
          <div class="label_container">
            <label for="username">Current username: {{ this.username }}</label>
            <input type="text" id="username" placeholder="New Username" [(ngModel)]="newUsername" name="newUsername" />
          </div>
          <div class="label_container">
            <label for="email">Current email: {{ this.email }}</label>
            <input type="text" id="email" placeholder="New Email" [(ngModel)]="newEmail" />
          </div>
          <div class="error_container">
            <p *ngIf="this.emailTaken === true">Email already taken</p>
            <p *ngIf="this.usernameTaken === true">Username already taken</p>
          </div>
          <button>Confirm changes</button>
        </div>
           <div *ngIf="currentStep === 1" class="info_container">
        <div class="label_container">
          <label for="currentPassword">Current Password</label>
        <input type="password" id="currentPassword" placeholder="Current Password" [(ngModel)]="oldPassword" />
        </div>
        <div class="label_container">
          <label for="newPassword">New Password</label>
          <input type="password" id="newPassword" placeholder="New Password" [(ngModel)]="newPassword" />
        </div>
        <div class="error_container">
          <p *ngIf="this.oldPasswordError === true">Current password is incorect</p>
          <p *ngIf="this.newPasswordError === true">The new password must be between 8 and 20 characters in length, and include at least one uppercase letter, one lowercase letter, and one digit.</p>
        </div>
        <button>Confirm changes</button>
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

  emailTaken: boolean = false;
  usernameTaken: boolean = false;
  oldPasswordError:boolean = false;
  newPasswordError:boolean = false;

  currentStep: number = 0;

  ngOnInit() {
    this.getUserData();
  }

  async getUserData() {
    try {
      const response: any = await axios.get("http://localhost:8080/user/me");
      this.id = response.id;
      this.email = response.email;
      this.username = response.username;
    } catch (e) {
      console.log(e);
    }
  }

  async getMyPost() {
    try {
      const response = await axios.get("http://localhost:8080/post/me");
      this.posts = response.data;
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  }

  nextStep() {
    if (this.currentStep < 2) {
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }
}
