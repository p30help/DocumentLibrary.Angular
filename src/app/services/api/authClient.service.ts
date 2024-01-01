import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, tap } from "rxjs";
import { TokenService } from "../auth/token.service";
import { LoginService } from "./login.service";
import { apiConfig } from "./apiConfig";

@Injectable()
export class AuthClientService {

    private http = inject(HttpClient);
    private tokenService = inject(TokenService);
    private loginService = inject(LoginService);

    get<TRes>(url: string, params?: HttpParams): Observable<TRes> {

        let token = this.tokenService.getToken();
        let headers = new HttpHeaders().set('Authorization', "Bearer " + token!);

        var res = this.http.get<TRes>(this.generateUrl(url), { headers: headers, params: params })
            .pipe(
                tap({
                    error: err => { this.checkToken(err) }
                })
            );

        return res;
    }

    getBlob(url: string): Observable<any> {

        let token = this.tokenService.getToken();
        let headers = new HttpHeaders().set('Authorization', "Bearer " + token!);

        var res = this.http.get(this.generateUrl(url), { headers: headers, responseType: 'blob' })
            .pipe(
                tap({
                    error: err => { this.checkToken(err) }
                })
            );

        return res;
    }

    put<TRes, TBody>(url: string, body: TBody, params: HttpParams): Observable<TRes> {

        let token = this.tokenService.getToken();
        let headers = new HttpHeaders().set('Authorization', "Bearer " + token!);

        var res = this.http.put<TRes>(this.generateUrl(url), body, { headers: headers, params: params })
            .pipe(
                tap({
                    error: err => { this.checkToken(err) }
                })
            )

        return res;
    }

    post<TRes, TBody>(url: string, body: TBody, itemId: string): Observable<TRes> {

        let token = this.tokenService.getToken();
        let headers = new HttpHeaders().set('Authorization', "Bearer " + token!);

        var res = this.http.post<TRes>(this.generateUrl(url), body, { headers: headers })
            .pipe(
                tap({
                    error: err => { 
                        err.itemId = itemId;
                        this.checkToken(err) }
                })
            );


        return res;
    }


    private generateUrl(url: string): string {
        return apiConfig.apiUrl + url;
    }

    private checkToken(err: any) {
        if (err.status == 401) {
            //this.loginService.logout();
        }
    }
}