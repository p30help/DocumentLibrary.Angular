import { HttpParams } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, firstValueFrom } from "rxjs";
import { GetListOfDocumentsResponse } from "./responses/getListOfDocumentsResponse";
import { AuthClientService } from "./authClient.service";

@Injectable()
export class GetListOfDocumentsService {

    private authClinetService = inject(AuthClientService);

    private apiUrl = "/api/documents/GetListOfDocuments";

    call(pageNumber: number, pageSize: number): Observable<GetListOfDocumentsResponse> {

        let params = new HttpParams().set('pageNumber', pageNumber).set('pageSize', pageSize);

        return this.authClinetService.get(this.apiUrl, params);
    }

}