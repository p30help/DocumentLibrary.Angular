import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { TokenService } from "../auth/token.service";
import { GenerateTemporaryLinkResponse } from "./responses/generateTemporaryLinkResponse";
import { AuthClientService } from "./authClient.service";

@Injectable()
export class GenerateTemporaryLinkService {

    private authClinetService = inject(AuthClientService);

    private apiUrl = "https://localhost:7090/api/documents/generateTemporaryLink";
    
    //constructor(private http: HttpClient, private tokenService: TokenService){        
    //}

    call(documentId: string, expirationTime: number): Observable<GenerateTemporaryLinkResponse> {

        let params = new HttpParams().set('expirationTime', expirationTime);
        //let token = this.tokenService.getToken();
        //let headers = new HttpHeaders().set('Authorization', "Bearer " + token!);

        //return this.http.put<GenerateTemporaryLinkResponse>(this.apiUrl + "/" + documentId, {} ,  { headers: headers, params: params });

        return this.authClinetService.put(this.apiUrl + "/" + documentId, {}, params);
    }

}