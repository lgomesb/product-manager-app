import { Category } from "./category";

export class CategoryPageable {
    public content!: Category[];
    public totalPages!: number;
    public totalElements!: number;
    public numberOfElements!: 5;
}