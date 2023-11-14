import { Injectable } from "@angular/core";
import axios from "axios";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  url: string = "http://localhost:8080/auth/local/signin";
  constructor() {}

  async login(data: any) {
    const response = await axios.post(
      "http://localhost:8080/auth/local/signin",
      data,
      { withCredentials: true }
    );
    return response;
  }
}
