import { Component } from "@angular/core";
import { PublicLayoutComponent } from "../public-layout/public-layout.component";
import { Router } from "@angular/router";
import axios from "axios";

@Component({
  selector: "app-public-header",
  template: `
    <header>
      <div class="header_container">
        <!-- <img
        class="logo"
        src="assets/img/global.png"
        alt="logo"
        (click)="this.redirect('/')"
        /> -->
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
  `,
  styleUrls: ["./public-header.css"],
})
export class PublicHeaderComponent extends PublicLayoutComponent {
  constructor(router: Router) {
    super(router);
  }

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
}
