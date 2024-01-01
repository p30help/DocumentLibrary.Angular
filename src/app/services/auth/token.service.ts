import { Injectable } from "@angular/core";

@Injectable()
export class TokenService {

    accessTokenKey: string = "access_token";

    getToken(): string | null {
        return localStorage.getItem(this.accessTokenKey);
    }

    setToken(token: string): void {
        localStorage.setItem(this.accessTokenKey, token);
    }

    clearToken() {
        localStorage.removeItem(this.accessTokenKey);
    }

    isTokenEmpty(): boolean {
        let item = localStorage.getItem(this.accessTokenKey);
        if (item == null || item == '') {
            return true;
        }

        return false;
    }
}