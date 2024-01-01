import { Component } from "@angular/core";
import { RegisterService } from "../services/api/register.service";
import { Router } from "@angular/router";
import { NotificationService } from "../services/notification.service";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html'
})
export class RegisterComponent {

    inputEmail: string = '';
    inputPass: string = '';
    inputPassRepeat: string = '';

    constructor(private registerUserService: RegisterService,
        private router: Router,
        private notification: NotificationService) {
    }

    OnRegister() {

        if (this.inputEmail.length == 0) {
            this.notification.showWarning('Email can not be empty');
            return;
        }

        if (this.validateEmail(this.inputEmail) == false) {
            this.notification.showWarning('Email is not correct');
            return;
        }

        if (this.inputPass.length == 0) {
            this.notification.showWarning('Password can not be empty');
            return;
        }

        if (this.inputPass.length < 8) {
            this.notification.showWarning('Password must be at least 8 characters');
            return;
        }

        if (this.inputPass != this.inputPassRepeat) {
            this.notification.showWarning('Passwords are not the same');
            return;
        }

        this.registerUserService.call({
            email: this.inputEmail,
            password: this.inputPass
        }).subscribe({
            next: (res) => {
                this.notification.showSuccess("Your account was created successfully");
                this.router.navigate(['Login']);
            },
            error: (err) => {
                this.notification.showApiError(err.errorMessage);
            }
        });
    }

    validateEmail(input: string): boolean {

        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (input.match(validRegex)) {
            return true;
        } else {
            return false;
        }
    }

}