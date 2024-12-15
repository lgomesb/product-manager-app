import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductsService } from 'src/app/products.service';
import { HttpErrorResponse } from '@angular/common/http';
import { StandardError } from 'src/app/StandardError';
import { Observable, throwError } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Category } from 'src/app/categories/category';
import { CategoriesService } from 'src/app/categories.service';
import { ProductDTO } from '../productDTO';

@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.css']
})
export class ProductsFormComponent implements OnInit{
  
  product: Product = new Product;
  productDTO: ProductDTO = new ProductDTO;
  categories: Category[] = [];
  success: boolean = false;
  errors!: String[];
  cat01: Category = new Category();


  constructor(private service: ProductsService, 
    private categoriesService: CategoriesService, 
    private router: Router, 
    private activateRoute: ActivatedRoute ) {

  }

  ngOnInit(): void {
    this.loadCategories();
    let params: Observable<Params> = this.activateRoute.params;

    params.subscribe(urlParams => {
      if(urlParams['id']) {
        this.service
        .getProductById(urlParams['id'])
        .subscribe({
          next: (p) => {this.product = p; this.selectCategory(this.product.category.id)},
          error: (e) => {this.success = false; this.handleError(e)},
          complete: () => {this.success = false; this.errors = []}
        });
      }

    })

  }

  selectCategory(categoryId: string) {
    const selectedCategory = this.categories.find(cat => cat.id === categoryId);
    if (selectedCategory) {
      this.product.category = selectedCategory;
    }
  }  

  onCategoryChange(selectedCategory: Category) {
    this.product.category = selectedCategory;
    // console.log(selectedCategory);

  }

  onSubmit(): void {
    console.log(this.product)
    this.productDTO = ProductDTO.create(this.product.id, this.product.name, this.product.category.id);

    this.service.salve(this.productDTO)
      .subscribe({
        next: (v) => console.log(v),
        error: (e) => {this.success = false; this.handleError(e)},
        complete: () => {this.success = true; this.errors = []} 
      } );  
  }

  loadCategories(): void {
    this.categoriesService
      .getCategories()
      .subscribe((c) => this.categories = c);

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
    this.router.navigate(['/products-list'])
  }
}
