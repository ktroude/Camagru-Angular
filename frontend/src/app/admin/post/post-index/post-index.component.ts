import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-index',
  template: `
  <body>
    <div class="container">
      <div *ngFor="let post of posts" class="box">
        <img [src]="'http://localhost:8080/' + post.picture" [alt]="'Image post of ' + post.author" (click)="redirectId('admin/post/edit/', post.id)">
      </div>
    </div>
  </body>
  `,
  styleUrls: [
    "./post.css"
  ]
})
export class PostIndexComponent implements OnInit {

  posts: any[] = [];

  constructor(private router:Router) {}

  async ngOnInit() {
    await this.getPostData();
  }

      public async getPostData() {
    try {
      const response = await axios.get('http://localhost:8080/post/all');
      this.posts = response.data;
      this.posts.sort((a, b) => a.id - b.id); 
    } catch(e) {
      console.error("can't get post from backend", e);
    }
  }


  redirectId(path:string, id:number){
    this.router.navigate([path + id.toString()])
  }

}
