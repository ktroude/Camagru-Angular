import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import axios from "axios";

@Component({
  selector: "app-user-edit",
  template: `
    <div class="container">
      <div class="left">
        <div class="card">
          username: {{ this.username }}
          <input
            [(ngModel)]="newUsername"
            type="text"
            placeholder="New username..."
          />
        </div>
        <div class="card">
          email: {{ this.email }}
          <input
            [(ngModel)]="newEmail"
            type="text"
            placeholder="New username..."
          />
        </div>
        <div class="card">
          Send Email: {{ this.sendEmail }}
          <input
            [(ngModel)]="sendEmail"
            type="checkbox"
            placeholder="New username..."
            id="send"
          />
        </div>
        <div class="card">
          Email Confirmed: {{ this.isEmailConfirmed }}
          <input
            [(ngModel)]="isEmailConfirmed"
            type="checkbox"
            placeholder="New username..."
            id="confirmed"
          />
        </div>
        <div>
          <button (click)="change()">Accept changes</button>
        </div>
      </div>
      <div class="right">
        <button (click)="deleteUser()">Delete User</button>
        <button>Check User's Post</button>
      </div>
    </div>
  `,
  styleUrls: ["./uEdit.css"],
})
export class UserEditComponent implements OnInit {
  userId: number = 0;

  username: string;
  newUsername: string;

  sendEmail: boolean;
  email: string;
  isEmailConfirmed: boolean;
  newEmail: string;

  role: string;

  url: string = "http://localhost:8080/";

  constructor(private route: ActivatedRoute, private router: Router) {}

  async ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const atoi = params.get("id");
      if (atoi) this.userId = parseInt(atoi, 10);
      else this.redirect("/admin");
    });
    await this.getUserData();
  }

  async getUserData() {
    try {
      const response = await axios.get(this.url + `user/${this.userId}`, {
        withCredentials: true,
      });
      this.username = response.data.username;
      this.email = response.data.email;
      this.sendEmail = response.data.sendEmail;
      this.role = response.data.role;
      this.isEmailConfirmed = response.data.isEmailConfirmed;
    } catch (e) {
      try {
        await this.retry();
        const response = await axios.get(this.url + `user/${this.userId}`, {
          withCredentials: true,
        });
        this.username = response.data.username;
        this.email = response.data.email;
        this.sendEmail = response.data.sendEmail;
        this.role = response.data.role;
        this.isEmailConfirmed = response.data.isEmailConfirmed;
      } catch (e) {
        console.error(e);
      }
    }
  }

  async updateUsername(newUsername: string) {
    try {
      await axios.post(
        this.url + "",
        { newUsername: newUsername },
        { withCredentials: true }
      );
    } catch (e) {
      await this.retry();
      await axios.post(
        this.url + "",
        { newUsername: newUsername },
        { withCredentials: true }
      );
    }
  }

  async updateEmail(newEmail: string) {
    try {
      await axios.post(
        this.url + "",
        { newEmail: newEmail },
        { withCredentials: true }
      );
    } catch (e) {
      await this.retry();
      await axios.post(
        this.url + "",
        { newEmail: newEmail },
        { withCredentials: true }
      );
    }
  }

  async updatePassword(newPassword: string) {
    try {
      await axios.post(
        this.url + "",
        { newPassword: newPassword },
        { withCredentials: true }
      );
    } catch (e) {
      await this.retry();
      await axios.post(
        this.url + "",
        { newPassword: newPassword },
        { withCredentials: true }
      );
    }
  }

  async updateEnable(bool: boolean) {
    try {
      await axios.post(
        this.url + "",
        { bool: bool },
        { withCredentials: true }
      );
    } catch (e) {
      await this.retry();
      await axios.post(
        this.url + "",
        { bool: bool },
        { withCredentials: true }
      );
    }
  }

  async retry() {
    try {
      await axios.post(this.url + "auth/refresh", null, {
        withCredentials: true,
      });
    } catch (e) {
      console.error(e);
    }
  }

  redirect(url: string) {
    this.router.navigate([url]);
  }

  async change() {
    await this.sendEmailSetting();
    await this.changeUsername();
    await this.changeEmail();
    await this.changeEmailConfirm();
    this.newUsername = this.newEmail = "";
  }

  async sendEmailSetting() {
    try {
      const resp = await axios.post(
        "http://localhost:8080/user/update/pref/admin",
        { setting: this.sendEmail, userId: this.userId },
        { withCredentials: true }
      );
      this.sendEmail = resp.data.sendEmail;
    } catch (e) {
      try {
        this.retry();
        const resp = await axios.post(
          "http://localhost:8080/user/update/pref/admin",
          { setting: this.sendEmail, userId: this.userId },
          { withCredentials: true }
        );
        this.sendEmail = resp.data.sendEmail;
      } catch (e) {
        console.log(e);
      }
    }
  }

  async changeUsername() {
    if (!this.newUsername) return;
    try {
      const resp = await axios.post(
        "http://localhost:8080/user/update/username",
        { username: this.newUsername, userid: this.userId },
        { withCredentials: true }
      );
      this.username = resp.data.username;
    } catch (e) {
      try {
        await this.retry();
        const resp = await axios.post(
          "http://localhost:8080/user/update/username",
          { username: this.newUsername, userid: this.userId },
          { withCredentials: true }
        );
        this.username = resp.data.username;
      } catch (e) {
        console.error(e);
      }
    }
  }

  async changeEmail() {
    if (!this.newEmail) return;
    try {
      const response = await axios.post(
        "http://localhost:8080/user/update/email",
        { email: this.newEmail, userId: this.userId },
        { withCredentials: true }
      );
      console.log(response.data);
      this.email = response.data.email;
    } catch (e) {
      try {
        this.retry();
        const response = await axios.post(
          "http://localhost:8080/user/update/email",
          { email: this.newEmail, userId: this.userId },
          { withCredentials: true }
        );
        response.data.email = this.email;
      } catch (e) {
        console.error(e);
      }
    }
  }

  async changeEmailConfirm() {
    try {
      const resp = await axios.post(
        "http://localhost:8080/user/update/confirm/admin",
        { setting: this.isEmailConfirmed, userId: this.userId },
        { withCredentials: true }
      );
      console.log("data == ", resp.data);
      this.isEmailConfirmed = resp.data.isEmailConfirmed;
    } catch (e) {
      try {
        this.retry();
        const resp = await axios.post(
          "http://localhost:8080/user/update/confirm/admin",
          { setting: this.isEmailConfirmed, userId: this.userId },
          { withCredentials: true }
        );
        this.isEmailConfirmed = resp.data.isEmailConfirmed;
      } catch (e) {
        console.log(e);
      }
    }
  }

  async deleteUser() {
    try {
      await axios.delete(this.url + "user/" + this.userId.toString(), {
        withCredentials: true,
      });
    } catch {
      try {
        this.retry();
        await axios.delete(this.url + "user/" + this.userId.toString(), {
          withCredentials: true,
        });
      } catch (e) {
        console.error(e);
      }
    }
  }
}
