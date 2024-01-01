import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, firstValueFrom, tap } from "rxjs";
import { TokenService } from "../auth/token.service";
import { LoginService } from "./login.service";

@Injectable()
export class AuthClientService {

    private http = inject( HttpClient);
    private tokenService = inject(TokenService);
    private loginService = inject(LoginService);

    get<TRes>(url: string, params?: HttpParams): Observable<TRes> {

        let token = this.tokenService.getToken();
        let headers = new HttpHeaders().set('Authorization', "Bearer " + token!);

        var res = this.http.get<TRes>(url, { headers: headers, params: params })
        .pipe(
            tap({
                error: err => {  this.checkToken(err) } 
            })
        );            

        return res;
    }

    getBlob(url: string): Observable<any> {

        let token = this.tokenService.getToken();
        let headers = new HttpHeaders().set('Authorization', "Bearer " + token!);

        var res = this.http.get(url, { headers: headers, responseType: 'blob' })
        .pipe(
            tap({
                error: err => {  this.checkToken(err) } 
            })
        );

        return res;
    }

    put<TRes, TBody>(url: string, body: TBody, params: HttpParams): Observable<TRes> {

        let token = this.tokenService.getToken();
        let headers = new HttpHeaders().set('Authorization', "Bearer " + token!);

        var res = this.http.put<TRes>(url, body , { headers: headers, params: params })
        .pipe(
            tap({
                error: err => {  this.checkToken(err) } 
            })
        )

        return res;
    }

    post<TRes, TBody>(url: string, body: TBody): Observable<TRes> {

        let token = this.tokenService.getToken();
        let headers = new HttpHeaders().set('Authorization', "Bearer " + token!);

        var res = this.http.post<TRes>(url, body, { headers: headers })
        .pipe(
            tap({
                error: err => {  this.checkToken(err) } 
            })
        );
        

        return res;
    }


    private checkToken(err: any)
    {    
        if(err.status == 401)
        {
            this.loginService.logout();
        }
    }
}