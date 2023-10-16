import { Component  } from "@angular/core";
import axios from "axios";

@Component({
  selector: "app-user-index",
  template: ` {{ userList }} `,
  styles: [],
})
export class UserIndexComponent {
  constructor() {}

  userList: any[] = [];

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    axios
      .get("http://localhost:8080/user/all")
      .then((response) => {
        console.log(response.data);
        this.userList = response.data;
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
