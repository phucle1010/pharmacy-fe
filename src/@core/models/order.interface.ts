import { StatusPaid } from "./statusPaid.model";
import { TypeOrder } from "./typeOrder.model";

export interface Order {
    id: number;
    userId: number;
    partnerId: number;
    typeOrder: TypeOrder;
    totalAmount: number;
    status: StatusPaid
}