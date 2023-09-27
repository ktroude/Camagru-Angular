import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminLayoutComponent } from '../admin-layout/admin-layout.component';

@Component({
  selector: 'app-admin-header',
  template: `
    <header>
      <img class="logo" src="assets/img/photos_660489.png" alt="logo" (click)="this.redirect('/admin/')">
      <div class="button_div">
        <button class="header_button" (click)="this.redirect('/admin/')">ADMIN MODE</button>
      </div>
    </header>
    <div class="delimitation"></div>
  `,
  styleUrls: [
    "./admin-header.css"
  ]
})
export class AdminHeaderComponent extends AdminLayoutComponent {

  constructor(router:Router){
    super(router);
  }
}
