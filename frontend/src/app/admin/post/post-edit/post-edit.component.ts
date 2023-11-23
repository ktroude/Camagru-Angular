import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import axios from "axios";

@Component({
  selector: "app-post-edit",
  template: `
    <div class="container">
    <button class="delete_post" (click)="deletePost()" >Delete Post</button>

      <img class="picture" [src]="this.picture" alt="Picture of the post" />
      <div class="like_coms">
        <div class="likes">
          <p>
            <img src="assets/img/thumbs-up.png" alt="thumbs up" />
            {{ likes.length }}
          </p>
        </div>
        <div class="comments">
          <p>
            <img src="assets/img/chat.png" alt="comments" />
            {{ comments.length }}
          </p>
        </div>
      </div>
      <div class="create_com">
        <div *ngIf="comments.length === 0" class="other_com">
          <p>No comments yet.</p>
        </div>
        <div *ngIf="comments.length">
          <div class="other_com" *ngFor="let com of comments">
          <img class="delete" src="assets/img/cross.png" alt="Delete comment" (click)="deleteCom(com)" >
            <p>
              <span class="name"> {{ com.username }}: </span>
              <span class="commit"> {{ com.content }} </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ["./edit.css"],
})
export class PostEditComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}

  postId: string | null;
  authorId: number;
  author: string;
  picture: string;
  description: string;
  comments: any[] = []; //  Comment[]
  likes: any[] = []; //Like[]
  comment: boolean = false;
  commit: string = "";
  username: string = "";

  url: string = "http://localhost:8080/";

  async ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.postId = params.get("id");
    });
    if (this.postId) await this.getPostData();
    else this.redirect("");
  }

  async getPostData() {
    try {
      console.log("POST ID === ", this.postId);
      const response = await axios.get(this.url + "post/" + this.postId, {
        withCredentials: true,
      });
      this.author = response.data.author;
      this.authorId = response.data.authorId;
      this.picture = "http://localhost:8080/" + response.data.picture;
      this.description = response.data.description;
      this.comments = response.data.comments;
      this.likes = response.data.likes;
    } catch (e) {
      try {
        this.retry();
        const response = await axios.get(`${this.url}post/${this.postId}`, {
          withCredentials: true,
        });
        this.author = response.data.author;
        this.authorId = response.data.authorId;
        this.picture = "http://localhost:8080/" + response.data.picture;
        this.description = response.data.description;
        this.comments = response.data.comments;
        this.likes = response.data.likes;
      } catch (e) {
        console.error(e);
      }
    }
  }

  async retry() {
    try {
      await axios.post(this.url + "auth/refresh", null, {
        withCredentials: true,
      });
    } catch (e) {
      console.error(e);
    }
  }

  redirect(url: string) {
    this.router.navigate([url]);
  }

  async deletePost() {
    try {
      await axios.delete(this.url + '/post/' + this.postId,  {withCredentials:true});
    } catch {
      try {
        await this.retry()
        await axios.delete(this.url + '/post/' + this.postId,  {withCredentials:true});
      } catch(e) {
        console.error(e);
      }
    }
  }

  async deleteCom(com:any){
    try {
      await axios.delete(this.url + 'post/com/' + com.id, {withCredentials:true});
      this.comments = this.comments.filter(elem => elem.id !== com.id);
    } catch {
      try {
        await this.retry();
        await axios.delete(this.url + 'post/com/' + com.id, {withCredentials:true});
      } catch(e) {
        console.error(e);
      }
    }
  }
}
