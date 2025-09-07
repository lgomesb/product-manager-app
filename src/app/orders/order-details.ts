import { ProductOrderDetails } from "./productOrderDetails";

export class OrderDetails {
    public id!: string;
    public description!: string; 
    public products!: ProductOrderDetails[];

    public static create(id: string, description: string) : OrderDetails {
        let order : OrderDetails = new OrderDetails();
        order.id = id;
        order.description = description; 
        order.products = [];
        return order;
    }

    constructor() {

    }
}