import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  template: `
  <body>
    <header>
          <img class="logo" src="assets/img/photos_660489.png" alt="logo" (click)='this.redirect("auth/login")'>
        <!-- <div class="title_container"> -->
          <h1 class="title">CAMAGRU</h1>
        <!-- </div> -->
    </header>
    <div class="form_container">
      <label for="username">Username</label>
      <input type="text" name="username" id="username">
      <label for="password">Password</label>
      <input class="pw_input" type="password" name="password" id="password">
      <button>Login</button>
    </div>
    <footer>
      <p>© 2023 Camagru. No rights reserved.</p>
    </footer>
  </body>
  `,
  styleUrls: [
    "./login.css",
  ]
})
export class LoginComponent {

  constructor(private router: Router) { }

  redirect(path:string) {
    this.router.navigate([path]);
  }
}

