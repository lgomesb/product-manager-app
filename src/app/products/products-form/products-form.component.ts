import { Component, OnInit } from '@angular/core';
import { Product } from '../product';

@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.css']
})
export class ProductsFormComponent implements OnInit{
  
  product: Product = new Product;

  ngOnInit(): void {
    this.product.id = "1";
    this.product.name = "Product example 1"; 
  
  }


}
