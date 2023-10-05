import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import axios from "axios";
import { Observable } from "rxjs";
import { TokenService } from "src/app/services/token.service";

@Component({
  selector: "app-user-index",
  template: ` {{ userList }} `,
  styles: [],
})
export class UserIndexComponent {
  constructor(private tokenService : TokenService) {}

  userList: any[] = [];

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    axios
      .get("http://localhost:8080/user/all", {
        headers: {
          Authorization: `Bearer ${this.tokenService.getToken()}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        this.userList = response.data;
      })
      .catch((error) => {
        // console.error(error);
      });
  }
}
