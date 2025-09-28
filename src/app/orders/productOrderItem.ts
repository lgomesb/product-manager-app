import { Product } from "../products/product";

export class ProductOrderItem {
    public product!: Product;
    public quantity!: number; 

    
    public static create(product: Product, quantity: number): ProductOrderItem {
        let productOrder: ProductOrderItem = new ProductOrderItem();
        productOrder.product = product;
        productOrder.quantity = quantity; 
        return productOrder;
    }

    constructor() {

    }
}