import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { UploadDocumentResponse } from "./responses/uploadDocumentResponse";
import { AuthClientService } from "./authClient.service";

@Injectable()
export class UploadDocumentService {

    private authClinetService = inject(AuthClientService);

    private apiUrl = "https://localhost:7090/api/documents";

    upload(fileName: string, file: File): Observable<UploadDocumentResponse> {

        // You could upload it like this:
        const formData = new FormData()
        formData.append('file', file, fileName)

        return this.authClinetService.post(this.apiUrl, formData);
    }

}