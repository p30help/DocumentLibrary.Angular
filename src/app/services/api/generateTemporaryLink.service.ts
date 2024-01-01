import { HttpParams } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { GenerateTemporaryLinkResponse } from "./responses/generateTemporaryLinkResponse";
import { AuthClientService } from "./authClient.service";

@Injectable()
export class GenerateTemporaryLinkService {

    private authClinetService = inject(AuthClientService);
    private apiUrl = "/api/documents/generateTemporaryLink";

    call(documentId: string, expirationTime: number): Observable<GenerateTemporaryLinkResponse> {

        let params = new HttpParams().set('expirationTime', expirationTime);

        return this.authClinetService.put(this.apiUrl + "/" + documentId, {}, params);
    }

}