import { Component } from "@angular/core";
import { PublicLayoutComponent } from "../public-layout/public-layout.component";
import { Router } from "@angular/router";
import axios from "axios";

@Component({
  selector: "app-public-header",
  template: `
    <header>
      <img
        class="logo"
        src="assets/img/photos_660489.png"
        alt="logo"
        (click)="this.redirect('/')"
      />
      <h1 class="title">CAMAGRU</h1>
      <div class="button_container">
        <img class="settings" src="assets/img/setting.png" alt="Settings" (click)="this.logout()" />
        <img class="power_on" src="assets/img/power-on.png" alt="Log out" (click)="this.redirect('/profil/me')" />
      </div>
    </header>
  `,
  styleUrls: ["./public-header.css"],
})
export class PublicHeaderComponent extends PublicLayoutComponent {
  constructor(router: Router) {
    super(router);
  }

  async logout() {
    await axios.post('http://localhost:8080/auth/logout');
    this.redirect('/auth/login')
  }
}
