'use client'

import axios from "axios";
import { environment } from 'src/environment/environment'

export class AuthService {
    ACCESS_TOKEN = 'auth_access_token';
    BE_URL = environment.host;
    HEADERS = environment.headers;

    constructor() {}

    public getTokenKey(): string {
        return this.ACCESS_TOKEN;
    }

    public saveToken(token: string) {
        window.localStorage.setItem(this.ACCESS_TOKEN, token);
    }

    public removeToken() {
        window.localStorage.removeItem(this.ACCESS_TOKEN);
    }

    public getToken() {
        return JSON.parse(window.localStorage.getItem(this.ACCESS_TOKEN) || '{}');
    }

    public authenticate(credentials: any) {
        const URL = `${this.BE_URL}/users/login`;
        return axios.post(URL, credentials, { headers: { ...this.HEADERS }});
    }
}