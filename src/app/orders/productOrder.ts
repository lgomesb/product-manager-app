
export class ProductOrder {
    public productId!: string;
    public quantity!: number; 

    
    public static create(productId: string, quantity: number): ProductOrder {
        let productOrder: ProductOrder = new ProductOrder();
        productOrder.productId = productId;
        productOrder.quantity = quantity; 
        return productOrder;
    }

    constructor() {

    }
}