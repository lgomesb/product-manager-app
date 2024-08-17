export class Product {
    public id!: string;
    //public categoryId!: string;
    public name!: string; 
    // Put here the category class
    
    public static create(id: string, name: string) : Product {
        let product : Product = new Product();
        product.id = id;
        product.name = name; 
        return product;
    }
}