import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductsService } from 'src/app/products.service';
import { HttpErrorResponse } from '@angular/common/http';
import { StandardError } from 'src/app/StandardError';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.css']
})
export class ProductsFormComponent implements OnInit{
  
  product: Product = new Product;
  success: boolean = false;
  errors!: String[];

  constructor(private service: ProductsService, 
    private router: Router) {

  }

  ngOnInit(): void {
    
  }

  onSubmit(): void {
    this.service.salve(this.product)
    .subscribe({
      next: (v) => console.log(v),
      error: (e) => {this.success = false; this.handleError(e)},
      complete: () => {this.success = true; this.errors = []} 
    } );  
  }


  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
            console.error('An error occurred:', error.error);
    } else {
      let standardError: StandardError = error.error;
      this.errors = [standardError.message];
      console.error(`Backend returned code ${error.status}, body was: `, standardError);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  rollbackProductsList(): void {
    this.router.navigate(['/categories-list'])
  }
}
