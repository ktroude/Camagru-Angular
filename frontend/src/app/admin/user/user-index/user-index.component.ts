import { Component  } from "@angular/core";
import { Router } from "@angular/router";
import axios from "axios";

@Component({
  selector: "app-user-index",
  template: `
    <div class="container">
      <div *ngFor="let user of userList" class="card" (click)="redirect('admin/user/edit/' + user.id.toString())" >
      <div class="id">{{user.id}}</div>
      <div class="username">{{user.username}}</div>
      <div class="email">{{user.email}}</div>
      <div class="role">{{user.role}}</div>
      </div>
    </div>
  `,
  styleUrls: [
    "./uIndex.css"
  ],
})
export class UserIndexComponent {
  constructor(private router:Router) {}

  userList: any[] = [];

  async ngOnInit() {
    await this.getAllUsers();
    this.userList.sort((a, b) => a.id - b.id);
  }

  async getAllUsers(){
    try {
      const resp = await axios.get('http://localhost:8080/user/all', {withCredentials:true});
      this.userList = resp.data;
      console.log(resp.data)
    } catch {
      await this.retry();
      const resp = await axios.get('http://localhost:8080/user/all', {withCredentials:true});
      this.userList = resp.data;
    }
  }

  async retry() {
    try {
      await axios.post('http://localhost:8080/auth/refresh', null, {withCredentials:true})
    } catch(e) {
      this.redirect('auth/login');
    }
  }

  redirect(url:string) {
    this.router.navigate([url])
  }


}
