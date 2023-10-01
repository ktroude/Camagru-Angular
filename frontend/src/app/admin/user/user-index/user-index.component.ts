import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-user-index",
  template: ` <p>user-index works!</p> `,
  styles: [],
})
export class UserIndexComponent {
  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.httpClient.get("http://localhost:8080/user").subscribe({
      next: (data) => {
        console.log(data);
      }
    });
  }
}
