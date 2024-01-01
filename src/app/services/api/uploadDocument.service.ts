import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { TokenService } from "../auth/token.service";
import { UploadDocumentResponse } from "./responses/uploadDocumentResponse";
import { AuthClientService } from "./authClient.service";

@Injectable()
export class UploadDocumentService {

    private authClinetService = inject(AuthClientService);

    private apiUrl = "https://localhost:7090/api/documents";
    
    //constructor(private http: HttpClient, private tokenService: TokenService){     }

    upload(fileName: string, file: File): Observable<UploadDocumentResponse> {

        //let token = this.tokenService.getToken();
        //let headers = new HttpHeaders().set('Authorization', "Bearer " + token!);

        // You could upload it like this:
        const formData = new FormData()
        formData.append('file', file, fileName)

        //return this.http.post<UploadDocumentResponse>(this.apiUrl, formData , { headers })

        return this.authClinetService.post(this.apiUrl, formData);
    }

}