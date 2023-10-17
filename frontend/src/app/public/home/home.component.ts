import { Component } from '@angular/core';
import axios from 'axios';
import { Post } from 'src/app/interface/home.interface';

@Component({
  selector: 'app-home',
  template: `
  <div class="home_container">
    <div class="left_container"></div>
    <div class="masonry-container" ngxMasonry>
        <div *ngFor="let post of posts" class="masonry-item">
          <img [src]="post.picture" [alt]="'Image post of ' + post.author">
          <p>{{ <a [href]="'profile/' + post.authorId">@post.author</a> }}</p>        
        </div>
    </div>
      <div class="right_container"></div>
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
  }
}
