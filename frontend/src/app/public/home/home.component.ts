import { Component } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { Post } from 'src/app/interface/home.interface';

@Component({
  selector: 'app-home',
  template: `
  <body>
    
    <div class="container">
      <div *ngFor="let post of posts" class="box">
        <img [src]="'http://localhost:8080/' + post.picture" [alt]="'Image post of ' + post.author" (click)="redirectId('/post/', post.id)">
      </div>
    </div>
  </body>
  `,
  styleUrls: [
    "./home.css",
  ]
})
export class HomeComponent {

    constructor(private router:Router){}

  posts: Post[] = [];

    ngOnInit() {
    this.getPostData();
  }

  public async getPostData() {
    try {
      const response = await axios.get('http://localhost:8080/post/all');
      this.posts = response.data;
      this.posts.sort(() => Math.random() - 0.5); 
    } catch(e) {
      console.error("can't get post from backend", e);
    }
  }

  redirectId(path:string, id:number){
    this.router.navigate([path + id.toString()])
  }
}
