import { Component, OnDestroy } from "@angular/core";
import { PublicLayoutComponent } from "../public-layout/public-layout.component";
import { Router } from "@angular/router";
import axios from "axios";
import { io, Socket } from "socket.io-client";
import { NotificationService } from "src/app/notification/notification.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-public-header",
  template: `
    <header>
      <div class="header_container"></div>
      <div class="title_container">
        <h1 class="title" (click)="redirect('')">CAMAGRU</h1>
      </div>
      <div class="button_container">
        <img
          class="icons"
          src="assets/img/video.png"
          alt="New Post"
          *ngIf="this.logged === true"
          (click)="redirect('/create')"
        />
        <img
          class="icons"
          src="assets/img/spanner.png"
          alt="Settings"
          *ngIf="this.logged === true"
          (click)="redirect('/profile')"
        />
        <img
          class="icons"
          src="assets/img/power.png"
          alt="Log out"
          *ngIf="this.logged === true"
          (click)="logout()"
        />
        <img
          class="icons"
          src="assets/img/power.png"
          alt="Log out"
          *ngIf="this.logged === false"
          (click)="redirect('/auth/login')"
        />
      </div>
    </header>
    <app-notification
      *ngIf="notif.message"
      [message]="notif.message"
      [who]="notif.who"
      (click)="redirect(notif.url)"
    ></app-notification>
  `,
  styleUrls: ["./public-header.css"],
})
export class PublicHeaderComponent
  extends PublicLayoutComponent
  implements OnDestroy
{
  constructor(router: Router, private notifService: NotificationService) {
    super(router);
    this.notifSubscription = this.notifService
      .getNotification()
      .subscribe((message) => {
        this.notif.message = message;
        this.clearNotificationAfterDelay();
      });
  }

  private notifSubscription: Subscription;
  socket: Socket;
  logged: boolean = false;
  user: any = null;
  notif: { message: string | null; who: string; url: string } = {
    message: null,
    who: "",
    url: "",
  };

  async ngOnInit() {
    await this.isLogged();
    if (this.logged === true) {
      const response = await axios.get("http://localhost:8080/user/me", {
        withCredentials: true,
      });
      if (response.status === 200) this.user = response.data;
      else if (response.status === 403) {
        const retry = await axios.post(
          "http://localhost:8080/auth/refresh",
          null,
          { withCredentials: true }
        );
        if (retry.status !== 200) this.redirect("/auth/required");
        const resp = await axios.get("http://localhost:8080/user/me", {
          withCredentials: true,
        });
        if (resp.status === 200) this.user = resp.data;
      }
      this.socket = io(`http://localhost:8080`, { withCredentials: true });
      if (this.socket && this.user) {
        this.socket.on("newComment", (data: any) => {
          this.handleNewComment(data);
        });
        this.socket.on("newLike", (data: any) => {
          this.handleNewLike(data);
        });
      }
    }
    console.log("logged == ", this.logged);
    console.log("user == ", this.user);
  }

  ngOnDestroy() {
    this.notifSubscription.unsubscribe();
  }

  async logout() {
    try {
      this.logged = false;
      await axios.post("http://localhost:8080/auth/logout", {
        withCredentials: true,
      });
      this.redirect("/auth/login");
    } catch (e) {
      this.logged = false;
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
      else this.logged = false;
    } catch (e: any) {
      if (e.code === "ERR_BAD_REQUEST") {
        try {
          const retry = await axios.post(
            "http://localhost:8080/auth/refresh",
            null,
            { withCredentials: true }
          );
          if (retry.status) this.redirect("auth/required");
          const resp = await axios.get(
            "http://localhost:8080/auth/verify/token",
            { withCredentials: true }
          );
          if (resp.status === 200) this.logged = true;
          else this.logged = false;
        } catch (e) {
          console.error(e);
          this.logged = false;
        }
      }
      this.logged = false;
    }
  }

  handleNewLike(data: any) {
    if (data.authorId === this.user.id) {
      const message = "liked";
      this.notif.who = data.who;
      this.notif.url = data.url;
      this.notifService.showNotification(message);
    }
  }

  handleNewComment(data: any) {
    if (data.authorId === this.user.id) {
      const message = "commented";
      this.notif.who = data.who;
      this.notif.url = data.url;
      this.notifService.showNotification(message);
    }
  }

  private clearNotificationAfterDelay() {
    setTimeout(() => {
      this.notif.message = null;
      this.notif.who = "";
      this.notif.url = "";
    }, 5000);
  }
}
