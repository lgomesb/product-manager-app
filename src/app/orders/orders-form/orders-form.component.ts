import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { CategoriesService } from 'src/app/categories.service';
import { Category } from 'src/app/categories/category';
import { ProductsService } from 'src/app/products.service';
import { Product } from 'src/app/products/product';
import { ProductDTO } from 'src/app/products/productDTO';
import { StandardError } from 'src/app/standard-error';
import { Order } from '../order';
import { AddProductOrderItemDialogComponent } from './add-product-order-item-dialog/add-product-order-item-dialog.component';

@Component({
  selector: 'app-orders-form',
  templateUrl: './orders-form.component.html',
  styleUrls: ['./orders-form.component.css']
})
export class OrdersFormComponent implements OnInit {

  order: Order = new Order;
  productDTO: ProductDTO = new ProductDTO;
  categories: Category[] = [];
  success: boolean = false;
  errors!: String[];
  cat01: Category = new Category();
  dataSource!: MatTableDataSource<Product>;
  displayedColumns: string[] = ['name', 'category', 'quantity'];

  constructor(
    private dialog: MatDialog,
    private service: ProductsService,
    private categoriesService: CategoriesService,
    private router: Router,
    private activateRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    let orderId = this.lookupRouteParameter();

    if (orderId) {
      this.service
        .getProductById(orderId)
        .subscribe({
          next: (p) => { this.order = p},
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


  onSubmit(): void {

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

  rollbackOrdersList(): void {
    this.router.navigate(['/orders-list'])
  }

  openSearchDialog() {
    const dialogRef = this.dialog.open(AddProductOrderItemDialogComponent, {
      width: '60%',
      data: {}
    });


  }

}

