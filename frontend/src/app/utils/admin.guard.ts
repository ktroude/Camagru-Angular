import { inject } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import axios from "axios";

export const adminGuard: CanActivateFn = async (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router = inject(Router);

  try {
    const response = await axios.get(
      "http://localhost:8080/auth/user/authority",
      { withCredentials: true }
    );
    console.log("authority response: ", response.data);
    if (response.data !== "ADMIN") {
      redirect("/home");
      return false;
    }
    return true;
  } catch (e) {
    try {
      await axios.post("http://localhost:8080/auth/refresh", null, {
        withCredentials: true,
      });
      const response = await axios.get(
        "http://localhost:8080/auth/user/authority",
        { withCredentials: true }
      );
      console.log("authority response: ", response.data);
      if (response.data !== "ADMIN"){
        redirect("/home");
        return false;
      } 
        return true;
    } catch (e) {
      redirect("/home");
      return false;
    }
  }

  function redirect(url: string) {
    router.navigate([url]);
  }
};
