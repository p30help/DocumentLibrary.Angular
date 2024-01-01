import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { TokenService } from "../auth/token.service";
import { GetCurrentUserInfoResponse } from "./responses/getCurrentUserInfoResponse";
import { AuthClientService } from "./authClient.service";

@Injectable()
export class GetCurrentUserInfoService {

    private authClinetService= inject(AuthClientService);

    private apiUrl = "https://localhost:7090/api/users/getCurrentUserInfo";
    
    //constructor(private http: HttpClient, private tokenService: TokenService){        
    //}

    call(): Observable<GetCurrentUserInfoResponse> {
        
        //let token = this.tokenService.getToken();
        //let headers = new HttpHeaders().set('Authorization', "Bearer " + token!);

        return this.authClinetService.get(this.apiUrl);

        //return this.http.get<GetCurrentUserInfoResponse>(this.apiUrl, { headers });

        
    }

}