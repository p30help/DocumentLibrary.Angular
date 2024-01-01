import { Component, OnInit, inject } from "@angular/core";
import { LoginService } from "../services/api/login.service";
import { TokenService } from "../services/auth/token.service";
import { NotificationService } from "../services/notification.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    providers: [LoginService, TokenService]
})
export class LoginComponent implements OnInit {

    private loginService = inject(LoginService);
    private notificaiton = inject(NotificationService);

    inputEmail: string = 'radi@local.me';
    inputPass: string = '12345678';

    ngOnInit() {
    }

    OnLogin() {

        if (this.inputEmail == null || this.inputEmail.length == 0) {
            this.notificaiton.showWarning('Please enter the email');
            return;
        }

        if (this.inputPass == null || this.inputPass.length == 0) {
            this.notificaiton.showWarning('Please enter the password');
            return;
        }

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