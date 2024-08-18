import { Category } from "../categories/category";

export class Product {
    public id!: string;
    public category!: Category;
    public name!: string; 
    // Put here the category class
    
    public static create(id: string, name: string) : Product {
        let product : Product = new Product();
        product.id = id;
        product.name = name; 
        return product;
    }

    constructor() {

    }
}