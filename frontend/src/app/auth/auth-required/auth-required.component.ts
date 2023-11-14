import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-auth-required",
  template: `
    <div class="container">
      <h2>Oops, you need to be connected if you want to go here!</h2>
      <img src="assets/img/required.jpg" alt="" />
      <h2>
        Try to
        <button (click)="redirect('/auth/login')">Login</button>
      </h2>
    </div>
  `,
  styleUrls: ["./required.css"],
})
export class AuthRequiredComponent {
  constructor(private router: Router) {}

  redirect(path: string) {
    this.router.navigate([path]);
  }
}
