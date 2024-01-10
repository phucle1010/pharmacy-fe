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
    public getBusinessPartners(query: any = null): Promise<any> {
        const queryString = new URLSearchParams(query).toString();
        if (query) {
            return axios.get(
                `${this.BE_URL}/partner?${queryString}`, 
                { headers: { ...this.HEADERS }}
            )
        }
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

    public postBusinessPartners(data: any): Promise<any> {
        return axios.post(
            `${this.BE_URL}/partner`, 
            data,
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

    public getProductCategoryList(): Promise<any> {
        return axios.get(
            `${this.BE_URL}/category`, 
            { headers: { ...this.HEADERS }}
        )
    }

    public saveProduct(data: any): Promise<any> {
        return axios.post(
            `${this.BE_URL}/product`, 
            data,
            { headers: { ...this.HEADERS }}
        )
    }


    // ORDER
    public getOrderBuyList(): Promise<any> {
        return axios.get(
            `${this.BE_URL}/order-buy`, 
            { headers: { ...this.HEADERS }}
        )
    }

    public getOrderSellList(): Promise<any> {
        return axios.get(
            `${this.BE_URL}/order-sell`, 
            { headers: { ...this.HEADERS }}
        )
    }

    public importOrderBuy(data: any): Promise<any> {
        return axios.post(
            `${this.BE_URL}/order-buy`,
            data, 
            { headers: { ...this.HEADERS }}
        )
    }


    public getReport(): Promise<any> {
        return axios.get(
            `${this.BE_URL}/report`,
            { headers: { ...this.HEADERS }}
        )
    }

}