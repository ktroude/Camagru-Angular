import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  template: `
    <app-admin-header></app-admin-header>
    <div class="admin_body">
      <div class="menu">
        <app-side-menu></app-side-menu>
      </div>
      <div class="admin_container">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styleUrls: [
    "./admin-layout.css",
  ]
})
export class AdminLayoutComponent {

  constructor(private router:Router){}

  redirect(path:string) {
    this.router.navigate([path]);
  }
}
