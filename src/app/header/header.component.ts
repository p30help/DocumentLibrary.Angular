import { Component } from "@angular/core";
import { TokenService } from "../services/auth/token.service";
import { Router } from "@angular/router";
import { LoginService } from "../services/api/login.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent{

    constructor(private tokenService: TokenService,
        private router: Router, private loginService: LoginService) {
    }

    OnLogout(){
        this.loginService.logout();
    }

}