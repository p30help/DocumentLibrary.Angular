import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { LoginResponse } from "./responses/loginResponse";
import { Observable, firstValueFrom } from "rxjs";
import { LoginRequest } from "./requests/loginRequest";
import { TokenService } from "../auth/token.service";
import { Router } from "@angular/router";
import { apiConfig } from "./apiConfig";

@Injectable()
export class LoginService {

    private http = inject(HttpClient);
    private tokenService = inject(TokenService);
    private router = inject(Router);

    private apiUrl = apiConfig.apiUrl + "/api/login";

    login(request: LoginRequest): Observable<LoginResponse> {
        var res = this.http.post<LoginResponse>(this.apiUrl, request);

        var promise = firstValueFrom(res);
        promise.then(res => {
            this.tokenService.setToken(res.accessToken);
            this.router.navigate(['Dashboard', 'Documents']);
        });

        return res;
    }

    logout() {
        this.tokenService.clearToken();
        this.router.navigateByUrl("/Login");
    }

    isLoggedIn(): boolean {
        if (this.tokenService.isTokenEmpty()) {
            return false;
        }

        return true;
    }

}