import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-layout',
  template: `
    <div class="menu">
      sidemenu
    </div>
    <div class="admin_container">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [
  ]
})
export class AdminLayoutComponent {

}
