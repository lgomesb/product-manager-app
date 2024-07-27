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
  
  }

  onSubmit(): void {
    console.log(this.product);
  }
}
