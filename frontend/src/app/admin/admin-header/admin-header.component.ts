import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AdminLayoutComponent } from "../admin-layout/admin-layout.component";

@Component({
  selector: "app-admin-header",
  template: `
    <header>
      <div class="header_container"></div>
      <div class="title_container">
        <h1 class="title" (click)="redirect('/admin')">CAMAGRU - Admin</h1>
      </div>
      <div class="button_box">
        <button (click)="redirect('admin/user/index')" >User</button>
        <button (click)="redirect('admin/post/index')" >Post</button>
      </div>
    </header>
  `,
  styleUrls: ["./admin-header.css"],
})
export class AdminHeaderComponent extends AdminLayoutComponent {
  constructor(router: Router) {
    super(router);
  }
}
