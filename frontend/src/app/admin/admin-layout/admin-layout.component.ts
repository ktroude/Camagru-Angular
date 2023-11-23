import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  template: `
    <app-admin-header></app-admin-header>
    <div class="container">
      <router-outlet></router-outlet>
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

  redirectId(path:string, id:number){
    this.router.navigate([path + id.toString()])
  }
}
