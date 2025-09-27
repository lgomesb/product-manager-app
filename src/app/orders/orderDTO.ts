import { OrderItemDTO } from "./orderItemDTO";

export class OrderDTO {
    public id!: string;
    public description!: string; 
    public productId!: string; 
    public items: OrderItemDTO[] = [];  

    
    public static create( description: string) : OrderDTO {
        let order : OrderDTO = new OrderDTO();
        order.description = description; 
        return order;
    }

    constructor() {

    }

}