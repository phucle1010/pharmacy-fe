import axios from "axios";
import { environment } from 'src/environment/environment'
import { AuthService } from "./auth.service";

export class ServerService {
    authService = new AuthService();
    BE_URL = environment.host;
    HEADERS = {
        ...environment.headers,
        'Authorization': this.authService.getToken()?.access_token
    };


    constructor() {}

    // USERS
    public getProfile(): Promise<any> {
        return axios.get(
            `${this.BE_URL}/users/profile`, 
            { headers: { ...this.HEADERS }}
        )
    }

    public getUserList(): Promise<any> {
        return axios.get(
            `${this.BE_URL}/users`, 
            { headers: { ...this.HEADERS }}
        )
    }

    public saveUserData(data: any): Promise<any> {
        return axios.post(
            `${this.BE_URL}/users`, 
            data,
            { headers: { ...this.HEADERS }}
        )
    }

    public updateUserData(id: number, data: any): Promise<any> {
        return axios.put(
            `${this.BE_URL}/users/${id}`, 
            data,
            { headers: { ...this.HEADERS }}
        )
    }
   
    public deleteUserData(id: number): Promise<any> {
        return axios.delete(
            `${this.BE_URL}/users/${id}`, 
            { headers: { ...this.HEADERS }}
        )
    }

    // BUSINESS PARTNERS
    public getBusinessPartners(): Promise<any> {
        return axios.get(
            `${this.BE_URL}/partner`, 
            { headers: { ...this.HEADERS }}
        )
    }

    public saveBusinessPartner(data: any): Promise<any> {
        return axios.post(
            `${this.BE_URL}/partner`, 
            data,
            { headers: { ...this.HEADERS }}
        )
    }

    public deleteBusinessPartner(id: number): Promise<any> {
        return axios.delete(
            `${this.BE_URL}/partner/${id}`, 
            { headers: { ...this.HEADERS }}
        )
    }

    // PRODUCT
    public getProductList(): Promise<any> {
        return axios.get(
            `${this.BE_URL}/product`, 
            { headers: { ...this.HEADERS }}
        )
    }

    public postBusinessPartners(data: any): Promise<any> {
        return axios.post(
            `${this.BE_URL}/partner`, 
            data,
            { headers: { ...this.HEADERS }}
        )
    }
}

