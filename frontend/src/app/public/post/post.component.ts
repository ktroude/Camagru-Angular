import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import axios from "axios";
import { ElementRef, Renderer2 } from "@angular/core";
import { ChangeDetectorRef } from "@angular/core";

@Component({
  selector: "app-post",
  template: `
    <div class="container">
      <img [src]="this.picture" alt="Picture of the post" />
      <div class="like_coms">
        <div class="likes">
          <p>
            <img
              src="assets/img/thumbs-up.png"
              alt="thumbs up"
              (click)="addLike()"
            />
            {{ likes.length }}
          </p>
        </div>
        <div class="comments">
          <p>
            <img
              src="assets/img/chat.png"
              alt="comments"
              (click)="addComment()"
            />
            {{ comments.length }}
          </p>
        </div>
      </div>
      <div *ngIf="comment === true" class="create_com">
        <textarea placeholder="Write a comment..."></textarea>
      </div>
    </div>
  `,
  styleUrls: ["./post.css"],
})
export class PostComponent {
  postId: string | null;
  authorId: number;
  author: string;
  picture: string;
  description: string;
  comments: any[] = []; //  Comment[]
  likes: any[] = []; //Like[]
  comment: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private el: ElementRef,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.postId = params.get("id");
    });
    if (this.postId) await this.getPost(this.postId);
  }

  async getPost(postId: string | null) {
    try {
      const response = await axios.get(`http://localhost:8080/post/${postId}`, {
        withCredentials: true,
      });
      this.author = response.data.author;
      this.authorId = response.data.authorId;
      this.picture = "http://localhost:8080/" + response.data.picture;
      this.description = response.data.description;
      this.comments = response.data.comments;
      this.likes = response.data.likes;
    } catch (e: any) {
      if (e.code === "ERR_BAD_REQUEST") {
        try {
          await axios.post("http://localhost:8080/auth/refresh", null, {
            withCredentials: true,
          });
          const response = await axios.get(
            `http://localhost:8080/post/${postId}`,
            { withCredentials: true }
          );
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
  }

  addComment() {
    this.comment = !this.comment;
    this.cdr.detectChanges();

    if (this.comment) {
      const newCommentDiv = this.el.nativeElement.querySelector(".create_com");

      if (newCommentDiv) {
        newCommentDiv.scrollIntoView({
          behavior: "smooth",
          block: "end",
          inline: "nearest",
        });
      }
    }
  }

  async addLike() {
    try {
      const response = await axios.post(
        "http://localhost:8080/post/like",
        { postId: this.postId },
        { withCredentials: true }
      );
        this.likes = response.data.likes
    } catch (e:any) {
      if (e.code === "ERR_BAD_REQUEST") {
        try {
          await axios.post("http://localhost:8080/auth/refresh", null, {
            withCredentials: true,
          });
          await axios.post(
            "http://localhost:8080/post/like",
            { postId: this.postId },
            { withCredentials: true }
          );
        } catch (e) {
          console.error(e);
        }
      }
    }
  }
}
