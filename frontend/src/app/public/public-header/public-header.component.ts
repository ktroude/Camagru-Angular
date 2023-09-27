import { Component } from '@angular/core';
import { PublicLayoutComponent } from '../public-layout/public-layout.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-public-header',
  template: `
    <header>
      <img class="logo" src="assets/img/photos_660489.png" alt="logo" (click)='this.redirect("home")'>
      <div class="button_div">
        <button class="header_button" (click)='this.redirect("/home")'>Home</button>
        <button class="header_button" (click)='this.redirect("/profile")'>Profile</button>
        <button class="header_button" (click)='this.redirect("/logout")'>Log out</button>
      </div>
    </header>
    <div class="delimitation"></div>
    `,
  styleUrls: [
    "./public-header.css",
  ]
})
export class PublicHeaderComponent extends PublicLayoutComponent {

  constructor(router:Router){
    super(router);
  }

}
