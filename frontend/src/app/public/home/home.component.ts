import { Component } from '@angular/core';
import { Post } from 'src/app/interface/home.interface';

@Component({
  selector: 'app-home',
  template: `
  <div class="home_container">
    <div class="left_container"></div>
    <div class="middle_container">
        <div *ngFor="let post of posts" class="post_container">
          <img [src]="post.url" [alt]="'Image post of ' + post.author">
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

  public getPostData() {
    
  }
}
