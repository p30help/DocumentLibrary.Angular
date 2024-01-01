import { Component } from "@angular/core";
import { LoginService } from "../services/api/login.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent {

    constructor(private loginService: LoginService) {
    }

    OnLogout() {
        this.loginService.logout();
    }
}