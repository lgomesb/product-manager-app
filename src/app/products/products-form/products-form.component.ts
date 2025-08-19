import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductsService } from 'src/app/products.service';
import { HttpErrorResponse } from '@angular/common/http';
import { StandardError } from 'src/app/standard-error';
import { Observable, throwError } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Category } from 'src/app/categories/category';
import { CategoriesService } from 'src/app/categories.service';
import { ProductDTO } from '../productDTO';
import { FindCategoriesDialogComponent } from './find-categories-dialog/find-categories-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.css']
})
export class ProductsFormComponent implements OnInit {

  product: Product = new Product;
  productDTO: ProductDTO = new ProductDTO;
  categories: Category[] = [];
  success: boolean = false;
  errors!: String[];
  cat01: Category = new Category();


  constructor(
     private dialog: MatDialog,
    private service: ProductsService,
    private categoriesService: CategoriesService,
    private router: Router,
    private activateRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.loadCategories();
    let productId = this.lookupRouteParameter();

    if (productId) {
      this.service
        .getProductById(productId)
        .subscribe({
          next: (p) => { this.product = p; this.selectCategory(this.product.category.id) },
          error: (e) => { this.success = false; this.handleError(e) },
          complete: () => { this.success = false; this.errors = [] }
        });
    }

  }

  lookupRouteParameter(): string {
    let params: Observable<Params> = this.activateRoute.params;
    let result!: string;

    params.subscribe(urlParams => {
      result = urlParams['id'];
    });

    return result;
  }

  selectCategory(categoryId: string) {
    const selectedCategory = this.categories.find(cat => cat.id === categoryId);
    if (selectedCategory) {
      this.product.category = selectedCategory;
    }
  }

  onCategoryChange(selectedCategory: Category) {
    this.product.category = selectedCategory;
  }

  onSubmit(): void {
    console.log(this.product)
    let productId = this.lookupRouteParameter();
    this.productDTO = ProductDTO.create(this.product.id, this.product.name, this.product.category.id);

    if (productId) {
      this.service.update(productId, this.productDTO)
        .subscribe({
          next: (v) => console.log(v),
          error: (e) => { this.success = false; this.handleError(e) },
          complete: () => { this.success = true; this.errors = [] }
        });
    } else {
      this.service.salve(this.productDTO)
        .subscribe({
          next: (v) => console.log(v),
          error: (e) => { this.success = false; this.handleError(e) },
          complete: () => { this.success = true; this.errors = [] }
        });
    }


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

  openSearchDialog() {
    const dialogRef = this.dialog.open(FindCategoriesDialogComponent, {
      width: '600px',
      data: {} // dados opcionais
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.selectCategory(result.id); // Define a categoria selecionada
        console.log(`Categoria selecionada: ${result.name}`);
      } else {
        console.log('Nenhuma categoria foi selecionada.');
      }
    });
  }

}
