import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Injectable()
export class NotificationService {

    constructor(private toastr: ToastrService) { }

    showError(msg: string) {

        this.toastr.error(msg, 'Error', {
            timeOut: 5000,
            progressBar: true,
            positionClass: 'toast-top-center'
        });
    }

    showApiError(err: any) {

        var msg = "Unkown error";

        if (err.error != null) {
            if (err.error.errorMessage == null) {
                msg = err.message;
            }
            else {
                msg = err.error.errorMessage;
            }
        }

        this.toastr.error(msg, 'Error', {
            timeOut: 5000,
            progressBar: true,
            positionClass: 'toast-top-center'
        });
    }

    showWarning(msg: string) {
        this.toastr.warning(msg, 'Warning', {
            timeOut: 5000,
            progressBar: true,
            positionClass: 'toast-top-center'
        });
    }

    showSuccess(msg: string) {
        this.toastr.success(msg, 'Success', {
            timeOut: 5000,
            progressBar: true,
            positionClass: 'toast-top-center'
        });
    }

}