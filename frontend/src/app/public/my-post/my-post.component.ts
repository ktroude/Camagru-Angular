import { Component } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { Post } from 'src/app/interface/home.interface';

@Component({
  selector: 'app-my-post',
  template: `
  <body>
    <div class="no_post" *ngIf="posts.length === 0">
    <span>No post yet...</span>
    </div>
    <div class="container" *ngIf="posts.length > 0">
    
      <div *ngFor="let post of posts" class="box">
        <img [src]="'http://localhost:8080/' + post.picture" [alt]="'Image post of ' + post.author" (click)="redirectId('/post/', post.id)">
      </div>
    </div>
  </body>
  `,
  styleUrls: [
    './mypost.css',
  ]
})
export class MyPostComponent {

    constructor(private router:Router){}

  posts: Post[] = [];

    async ngOnInit() {
      try {
        await axios.get('http://localhost:8080/auth/verify/token', {withCredentials:true});
      } catch(e:any) {
        try {
          await axios.post('http://localhost:8080/auth/refresh', null, {withCredentials:true});
        } catch {
          this.redirect("auth/required");
        }
      }
    this.getPostData();
  }

  public async getPostData() {
    try {
      const response = await axios.get('http://localhost:8080/post/me', {withCredentials:true});
      this.posts = response.data;
      console.log('data == ', response.data)
      console.log('post ==', this.posts)
    } catch(e) {
      console.error("can't get post from backend", e);
    }
  }

  redirectId(path:string, id:number){
    this.router.navigate([path + id.toString()])
  }

  redirect(path:string){
    this.router.navigate([path])
  }
}