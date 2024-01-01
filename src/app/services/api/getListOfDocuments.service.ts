import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, firstValueFrom } from "rxjs";
import { TokenService } from "../auth/token.service";
import { GetListOfDocumentsResponse } from "./responses/getListOfDocumentsResponse";
import { AuthClientService } from "./authClient.service";

@Injectable()
export class GetListOfDocumentsService {

    //private http= inject( HttpClient);
    //private tokenService= inject(TokenService);
    private authClinetService= inject(AuthClientService);

    private apiUrl = "https://localhost:7090/api/documents/GetListOfDocuments";

    call(pageNumber: number, pageSize: number): Observable<GetListOfDocumentsResponse> {       

        let params = new HttpParams().set('pageNumber', pageNumber).set('pageSize', pageSize);
        //let token = this.tokenService.getToken();
        //let headers = new HttpHeaders().set('Authorization', "Bearer " + token!);

        return this.authClinetService.get(this.apiUrl, params);

        //return this.http.get<GetListOfDocumentsResponse>(this.apiUrl, { headers, params });        
    }

}