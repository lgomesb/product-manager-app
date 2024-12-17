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
    return this.http.get<Category[]>(`${this.DEFAULT_ENDPOINT}`);  
  }
}
