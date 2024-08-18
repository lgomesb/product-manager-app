import { Product } from "./product";

export class ProductPageable {
    public content!: Product[];
    public totalPages!: number;
    public totalElements!: number;
    public numberOfElements!: 5;
}