import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { GetCurrentUserInfoResponse } from "./responses/getCurrentUserInfoResponse";
import { AuthClientService } from "./authClient.service";

@Injectable()
export class GetCurrentUserInfoService {

    private authClinetService= inject(AuthClientService);
    private apiUrl = "https://localhost:7090/api/users/getCurrentUserInfo";

    call(): Observable<GetCurrentUserInfoResponse> {
        
        return this.authClinetService.get(this.apiUrl);
    }

}