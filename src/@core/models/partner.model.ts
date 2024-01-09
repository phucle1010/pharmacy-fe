import { Order } from "./order.interface";
import { TypePartner } from "./typePartner.model";

export interface Partner {
    id: number;
    fullName: string;
    email: string;
    avatar: string;
    typePartner: TypePartner;
    phone: string;
    address: string;
    orders: Order[]
}