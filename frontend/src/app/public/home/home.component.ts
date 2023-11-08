import { Component } from '@angular/core';
import axios from 'axios';
import { Post } from 'src/app/interface/home.interface';

@Component({
  selector: 'app-home',
  template: `
  <div class="home_container">
        <div *ngFor="let post of posts">
          <img class='post' [src]="'http://localhost:8080/' + post.picture" [alt]="'Image post of ' + post.author">
          <p><a class='link' [href]="'profile/' + post.authorId">&#64;{{post.author}}</a></p>        
        </div>
  </div>
  `,
  styleUrls: [
    "./home.css",
  ]
})
export class HomeComponent {

  posts: Post[] = [];

    ngOnInit() {
    this.getPostData();
  }

  public async getPostData() {
    const response = await axios.get('http://localhost:8080/post/all');
    this.posts = response.data;
    console.log('post =====', this.posts);
  }
}
