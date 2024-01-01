import { inject } from "@angular/core"
import { LoginService } from "../api/login.service"
import { Router } from "@angular/router";

export const CanActivate = () => {
    const loginService = inject(LoginService);
    const router = inject(Router);

    if (loginService.isLoggedIn()) {
        return true;
    }
    else {
        router.navigateByUrl("/Login");
        return false;
    }

}