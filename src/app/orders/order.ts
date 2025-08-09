import { ProductOrder } from "./productOrder";

export class Order {
    public id!: string;
    public description!: string; 
    public items!: ProductOrder[];

    public static create(id: string, description: string) : Order {
        let order : Order = new Order();
        order.id = id;
        order.description = description; 
        return order;
    }

    constructor() {

    }
}