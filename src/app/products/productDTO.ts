
export class ProductDTO {
    public id!: string;
    public name!: string; 
    public idCategory!: string; 

    
    public static create(id: string, name: string, idCategory: string) : ProductDTO {
        let product : ProductDTO = new ProductDTO();
        product.id = id;
        product.name = name; 
        product.idCategory = idCategory;
        return product;
    }

    constructor() {

    }
}