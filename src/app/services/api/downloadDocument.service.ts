import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { AuthClientService } from "./authClient.service";

@Injectable()
export class DownloadDocumentService {

    private authClinetService = inject(AuthClientService);
    private apiUrl = "/api/documents";

    

    call(documentId: string): Observable<any> {

        return this.authClinetService.getBlob(this.apiUrl + "/" + documentId);
    }
}