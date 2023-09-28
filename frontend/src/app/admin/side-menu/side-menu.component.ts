import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AdminLayoutComponent } from "../admin-layout/admin-layout.component";

@Component({
  selector: "app-side-menu",
  template: `
    <div class="menu_body">
      <div class="chapitre">
        <p>User</p>
        <button (click)='this.redirect("/admin/user/index")'>Index</button>
        <button>Edit</button>
        <button (click)='this.redirect("/admin/user/add")'>Add</button>
        <button>Delete</button>
      </div>
      <div class="chapitre">
        <p>Post</p>
        <button (click)='this.redirect("/admin/post/index")'>Index</button>
        <button>Edit</button>
        <button (click)='this.redirect("/admin/post/add")'>Add</button>
        <button>Delete</button>
      </div>
    </div>
  `,
  styleUrls: ["./side-menu.css"],
})
export class SideMenuComponent extends AdminLayoutComponent{

  constructor(router:Router){
    super(router);
  }
}
