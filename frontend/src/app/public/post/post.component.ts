import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import axios from "axios";
import { ElementRef, Renderer2 } from "@angular/core";
import { ChangeDetectorRef } from "@angular/core";
import { io, Socket } from "socket.io-client";

@Component({
  selector: "app-post",
  template: `
    <div class="container">
      <img class="picture" [src]="this.picture" alt="Picture of the post" />
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
        <div class="my_com">
          <textarea
            [(ngModel)]="commit"
            placeholder="Write a comment..."
          ></textarea>
          <button class="comment" (click)="postComment()">Comment</button>
        </div>
        <div *ngIf="comments.length === 0" class="other_com">
          <p>No comments yet.</p>
        </div>
        <div *ngIf="comments.length">
          <div class="other_com" *ngFor="let com of comments">
            <p>
              <span class="name"> {{ com.username }}: </span>
              <span class="commit"> {{ com.content }} </span>
            </p>
          </div>
        </div>
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
  commit: string = "";
  socket: Socket;
  username: string = "";

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private el: ElementRef,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    await this.isLogged();
    this.socket = io(`http://localhost:8080`, { withCredentials: true });
    console.log('socket == ',this.socket)
    await this.getMe();
    this.route.paramMap.subscribe((params) => {
      this.postId = params.get("id");
    });
    if (this.postId) await this.getPost(this.postId);
    else this.redirect("");
  }

  async getMe() {
    try {
      const resp = await axios.get("http://localhost:8080/user/me", {
        withCredentials: true,
      });
      this.username = resp.data.username;
    } catch (e) {
      try {
        await axios.post("http://localhost:8080/auth/refresh", null, {
          withCredentials: true,
        });
        const resp = await axios.get("http://localhost:8080/user/me", {
          withCredentials: true,
        });
        this.username = resp.data.username;
      } catch (e) {
        console.log(e);
      }
    }
  }

  async isLogged() {
    try {
      await axios.get("http://localhost:8080/auth/verify/token", {
        withCredentials: true,
      });
    } catch (e: any) {
      if (e.code === "ERR_BAD_REQUEST") {
        try {
          await axios.post("http://localhost:8080/auth/refresh", null, {
            withCredentials: true,
          });
        } catch (e) {
          this.redirect("/auth/required");
        }
      }
    }
  }

  redirect(path: string) {
    this.router.navigate([path]);
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
      console.log("comms == ", this.comments);
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
      this.likes = response.data.likes;
    } catch (e: any) {
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

  async postComment() {
    const id: string = this.postId?.length ? this.postId : "-1";
    const data: { content: string; postId: number } = {
      content: this.commit,
      postId: parseInt(id, 10),
    };
    if (data.content.length === 0) return;
    try {
      const resp = await axios.post(
        "http://localhost:8080/post/new/comment",
        data,
        {
          withCredentials: true,
        }
      );
      this.commit = "";
      this.comments = resp.data.comments;
      const payload = {
        postId: this.postId,
        commentAuthor: this.username,
      };
      this.socket.emit("comment", payload);
      console.log('emited')
    } catch (e: any) {
      if (e.code === "ERR_BAD_REQUEST") {
        try {
          await axios.post("http://localhost:8080/auth/refresh", null, {
            withCredentials: true,
          });
          const resp = await axios.post(
            "http://localhost:8080/post/new/comment",
            data,
            {
              withCredentials: true,
            }
          );
          this.commit = "";
          this.comments = resp.data.comments;
          const payload = {
            postId: this.postId,
            commentAuthor: this.username,
          };
          this.socket.emit("comment", payload);
        } catch (e) {
          console.error(e);
        }
      }
    }
  }
}
