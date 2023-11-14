import { Component } from "@angular/core";
import { PublicLayoutComponent } from "../public-layout/public-layout.component";
import { Router } from "@angular/router";
import axios from "axios";
import { SocketService } from "src/app/services/socket.service";

@Component({
  selector: "app-public-header",
  template: `
    <header>
      <div class="header_container">
      </div>
      <div class="title_container">
        <h1 class="title">CAMAGRU</h1>
      </div>
        <div class="button_container">
          <img class="icons" src="assets/img/notification-bell.png" alt="Notifications" *ngIf="this.logged === true">  
          <img class="icons" src="assets/img/video.png" alt="New Post" *ngIf="this.logged === true" (click)="redirect('/create')">  
          <img class="icons" src="assets/img/spanner.png" alt="Settings" *ngIf="this.logged === true" (click)="redirect('/profile')"/>
          <img class="icons" src="assets/img/power.png" alt="Log out" *ngIf="this.logged === true" (click)="logout()"/>
          <img class="icons" src="assets/img/power.png" alt="Log out" *ngIf="this.logged === false" (click)="redirect('/auth/login')"/>
        </div>
    </header>
  `,
  styleUrls: ["./public-header.css"],
})
export class PublicHeaderComponent extends PublicLayoutComponent {
  constructor(
    router: Router,
    private socketService: SocketService
    ) {
    super(router);
  }

  logged:boolean = false;

    async ngOnInit() {
    await this.isLogged();
    if (this.logged === true) {                                                                                                                                                                                                                                                                                                                                                                                                                                                        vvffr's
      this.socketService.newComment().subscribe((data: any) => {
        this.handleNewComment(data);
      });
      this.socketService.newLike().subscribe((data: any) => {
        this.handleNewLike(data);
      });
    }
  }

  async logout() {
    await axios.post('http://localhost:8080/auth/logout');
    this.redirect('/auth/login')
  }

  async isLogged() {
    try {
      const response = await axios.get('http://localhost:8080/auth/verifiy/token')
      if (response.status === 200)
        this.logged = true;
    } catch {
      this.logged = false;
    }
  }

  handleNewLike(data: any) {

  }
  
  handleNewComment(data:any) {

  }


}
