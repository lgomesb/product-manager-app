import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductsService } from 'src/app/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  products: Product[] = [];
  productSelected!: Product;

  constructor(
    private service: ProductsService,
    private router: Router) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.service
      .getProducts()
      .subscribe((p) => this.products = p);
  }


  newProduct() : void {
    this.router.navigate(['/products-form']);
  }

  readyProduct(product: Product): void {

  }

  deleteProduct(): void {
    
  }

}
