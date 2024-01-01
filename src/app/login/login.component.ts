import { Component, OnInit } from "@angular/core";
import { LoginService } from "../services/api/login.service";
import { TokenService } from "../services/auth/token.service";
import { NotificationService } from "../services/notification.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    providers: [LoginService, TokenService]
})
export class LoginComponent implements OnInit {

    inputEmail: string = 'radi@local.me';
    inputPass: string = '12345678';

    constructor(private loginService: LoginService,
        private notificaiton: NotificationService) {
    }

    ngOnInit() {
    }

    OnLogin() {
        this.loginService.login({
            email: this.inputEmail,
            password: this.inputPass
        }).subscribe({
            next: (res) => {
                this.notificaiton.showSuccess("You logged in successfully");
            },
            error: (err) => { this.notificaiton.showApiError(err) }
        });
    }

}