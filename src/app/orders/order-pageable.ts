import { Order } from "./order";

export class OrderPageable {
    public content!: Order[];
    public totalPages!: number;
    public totalElements!: number;
    public numberOfElements!: 5;
}