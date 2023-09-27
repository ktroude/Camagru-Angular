import { Component } from "@angular/core";

@Component({
  selector: "app-side-menu",
  template: `
    <div class="menu_body">
      <div class="chapitre">
        <p>User</p>
        <button>Index</button>
        <button>Edit</button>
        <button>Add</button>
        <button>Delete</button>
      </div>
      <div class="chapitre">
        <p>Post</p>
        <button>Index</button>
        <button>Edit</button>
        <button>Add</button>
        <button>Delete</button>
      </div>
    </div>
  `,
  styleUrls: ["./side-menu.css"],
})
export class SideMenuComponent {}
