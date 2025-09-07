
export class ProductOrderDetails {
    public id!: string;
    public quantity!: number;
    public name!: string;
    public category!: string; 

    
    public static create(id: string, quantity: number, name: string, category: string): ProductOrderDetails {
        let productOrder: ProductOrderDetails = new ProductOrderDetails();
        productOrder.id = id;
        productOrder.quantity = quantity; 
        productOrder.name = name;
        productOrder.category = category;
        return productOrder;
    }

    constructor() {

    }
}