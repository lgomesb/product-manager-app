import { Injectable } from '@angular/core';
import { Category } from './categories/category';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoryPageable } from './categories/category-pageable';

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

  update( id: String, category : Category ) : Observable<any> {
    return this.http.put(`${this.DEFAULT_ENDPOINT}/${id}`, category);
  }

  delete( id: String ) : Observable<any> {
    return this.http.delete<any>(`${this.DEFAULT_ENDPOINT}/${id}`);  
  }

  getCategoryById( id: String ) : Observable<any> {
    return this.http.get<any>(`${this.DEFAULT_ENDPOINT}/${id}`);  
  }

  getCategories() : Observable<Category[]>  {
    return this.http.get<Category[]>(`${this.DEFAULT_ENDPOINT}/all`);  
  }

  getCategoriesPageable(page: number, pageSize: number) : Observable<CategoryPageable> {
    const params = {
      page: page.toString(),
      linesPerPage: pageSize.toString()
    };

    const url = `${this.DEFAULT_ENDPOINT}?page=${params.page}&linesPerPage=${params.linesPerPage}`;

    return this.http.get<CategoryPageable>(url);
  }
}
