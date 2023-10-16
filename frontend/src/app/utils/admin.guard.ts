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
    const response = await axios.get("http://localhost:8080/auth/verify/token");
    if (response.status === 200) {
      return true;
    } else if (response.status === 401) {
      const verify = await retry();
      return verify;
    }
    return false;
  } catch (error) {
    return false;
  }

  async function retry(): Promise<boolean> {
    try {
      const response = await axios.post("http://localhost:8080/auth/refresh");
      if (response.status === 200) return true;
      return false;
    } catch {
      return false;
    }
  }
};
