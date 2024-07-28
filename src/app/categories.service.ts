import { Injectable } from '@angular/core';
import { Category } from './categories/category';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private HOST: String = "http://localhost:8082";
  private DEFAULT_ENDPOINT: String = `${this.HOST}/product-mgmt/category`;

  constructor( private http: HttpClient ) { }

  salve( category : Category ) : Observable<any> {
    return this.http.post(`${this.DEFAULT_ENDPOINT}`, category);
  }

  getCategoryById( id: String ) : Observable<any> {
    return this.http.get<any>(`${this.DEFAULT_ENDPOINT}/${id}`);  
  }

  getCategories() : Observable<Category[]>  {

    return this.http.get<Category[]>(`${this.DEFAULT_ENDPOINT}`);  

    // let category1 : Category = new Category();
    // category1.id = "cfd21034-2df0-42e0-9e09-81bfe5adae35";
    // category1.name = "Vegetables";
    
    // let category2 : Category = new Category();
    // category2.id = "1f170aa2-78f4-4d12-964c-ab6b09913b4f";
    // category2.name = "Personal";

    // let categories: Category[] = [];
    // categories.push(category1, category2);
    
    // return categories;
  }
}
