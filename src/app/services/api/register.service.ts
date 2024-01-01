import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { RegisterUserResponse } from "./responses/registerUserResponse";
import { RegisterUserRequest } from "./requests/registerUserRequest";

@Injectable()
export class RegisterService {

    private apiUrl = "https://localhost:7090/api/users/addUser";
    
    constructor(private http: HttpClient){    
    }

    call(request: RegisterUserRequest): Observable<RegisterUserResponse> {
        return this.http.post<RegisterUserResponse>(this.apiUrl, request);
    }

}