import { Injectable } from '@angular/core';
import { Product } from './products/product';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private HOST: String = "http://localhost:8082";
  private DEFAULT_ENDPOINT: String = `${this.HOST}/product-mgmt/product`;

  constructor( private http: HttpClient ) { }

  salve( category : Product ) : Observable<any> {
    return this.http.post(`${this.DEFAULT_ENDPOINT}`, category);
  }

  getProductById( id: String ) : Observable<any> {
    return this.http.get<any>(`${this.DEFAULT_ENDPOINT}/${id}`);  
  }

  getProduct() : Product {
    let product : Product = new Product();
    product.id = "213456";
    product.name = "Product 1";

    return product;
  }
}
