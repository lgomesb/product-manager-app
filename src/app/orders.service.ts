import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private API_URL: string = environment.productApiURL;
  private DEFAULT_ENDPOINT: string = `${this.API_URL}/order`;

  constructor( private http: HttpClient ) { }

  
}
