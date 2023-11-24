import { Component } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-recover',
  template: `

        <header>
        <div class="header_container"></div>
        <div class="title_container">
          <h1 class="title" (click)="redirect('/auth')" >CAMAGRU</h1>
        </div>
      </header>
    <div class="container" *ngIf="sent === false">
    Type your email
    <input [(ngModel)]="email" type="text" placeholder="Email...">
    <button (click)="send()" >Send recover link</button>
    </div>

    <div class="container" *ngIf="sent === true" >
    If your email exists in the database, a link has been sent to you.
    <button (click)="redirect('/auth')" >Come back to login</button>
  </div>
  `,
  styleUrls: [
    "./recover.css",
  ]
})
export class RecoverComponent {

  url:string = 'http://localhost:8080/'
  email:string;
  sent:boolean = false;

  constructor(private router:Router) {}

  redirect(url:string){
    this.router.navigate([url]);
  }

  async send() {
    try {

      this.sent = true;
      await axios.post(this.url + "auth/recover/send/email", {email:this.email})
    } catch(e) {
      console.error(e);
    }
  }
}
