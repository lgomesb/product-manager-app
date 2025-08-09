
export class OrderDTO {
    public id!: string;
    public name!: string; 
    public idCategory!: string; 

    
    public static create(id: string, name: string, idCategory: string) : OrderDTO {
        let product : OrderDTO = new OrderDTO();
        product.id = id;
        product.name = name; 
        product.idCategory = idCategory;
        return product;
    }

    constructor() {

    }
}