import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { TokenService } from "../auth/token.service";
import { AuthClientService } from "./authClient.service";

@Injectable()
export class DownloadDocumentService {

    private authClinetService = inject(AuthClientService);

    private apiUrl = "https://localhost:7090/api/documents";
    
    //constructor(private http: HttpClient, private tokenService: TokenService){}

    call(documentId: string): Observable<any> {
    
        //let token = this.tokenService.getToken();
        //let headers = new HttpHeaders().set('Authorization', "Bearer " + token!);

        return this.authClinetService.getBlob(this.apiUrl + "/" + documentId);

        //return this.http.get(this.apiUrl + "/" + documentId, { headers: headers, responseType: 'blob' });

    }

    // public downloadFile(data: HttpResponse<Blob>) {
    //     const contentDisposition = data.headers.get('content-disposition');
    //     const filename = this.getFilenameFromContentDisposition(contentDisposition);
    //     const blob = data.body;
    //     const url = window.URL.createObjectURL(blob);
    //     const anchor = document.createElement("a");
    //     anchor.download = filename;
    //     anchor.href = url;
    //     anchor.click();
    //   }
    
    //   private getFilenameFromContentDisposition(contentDisposition: string): string {
    //     const regex = /filename=(?<filename>[^,;]+);/g;
    //     const match = regex.exec(contentDisposition);
    //     const filename = match.groups['filename'];
    //     return filename;
    //   }

}