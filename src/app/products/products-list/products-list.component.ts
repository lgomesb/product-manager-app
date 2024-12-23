import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Product } from '../product';
import { ProductsService } from 'src/app/products.service';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { ErrorUtils } from 'src/app/utils/error-util';
import { ProductPageable } from '../product-pageable';

declare var bootstrap: any; 

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements AfterViewInit, OnInit {

  products: Product[] = [];
  productSelected!: Product;

  displayedColumns: string[] = ['name', 'category', 'edit'];
  dataSource! : MatTableDataSource<Product>;
  totalLength = 0;
  pageSize = 5;
  errors!: String[];
  showErrorModal!: boolean;


  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private service: ProductsService,
    private router: Router) { }

  ngOnInit(): void {
    this.loadAndReloadDataSource();   
  }

  ngAfterViewInit(): void {    
  }

  loadAndReloadDataSource() { 
    this.dataSource = new MatTableDataSource<Product>([]);
    this.loadProducts(0, this.pageSize);

    if(this.paginator) {
      this.paginator._changePageSize(this.paginator.pageSize);
    }

  }

  onPageChange(event: any) {
    this.loadProducts(event.pageIndex, event.pageSize);
  }

  loadProducts(pageIndex: number, pageSize: number): void {
      this.service
      .getProductsPageable(pageIndex, pageSize)
      .subscribe({
        next: (p) => this.processProductPageable(p),
        error: (e) => {this.handleError(e, "Error occurred when retrieving products.");}, 
        complete: () => {this.errors = []; this.showErrorModal = false}
      });
  }


  newProduct() : void {
    this.router.navigate(['/products-form']);
  }

  readyProduct(product: Product): void {
    this.productSelected = product;
  }

  deleteProduct(): void {
    this.service
    .delete(this.productSelected.id)
    .subscribe(
      {
        error: (e) => {this.handleError(e, "Error occurred when deleting the product.")}, 
        complete: () => {this.loadAndReloadDataSource()}         
      } 
    );
  }

  showModal() : void {
    const modelElement = document.getElementById("modalError");
    console.info(`Passei aqui: ShowModal ${this.showErrorModal}`);

    if(modelElement) {
      const model = new bootstrap.Modal(modelElement);
      model.show();
    }
  }

  closeModal(): void {
    this.showErrorModal = false;
  }

  private processProductPageable(productPageable: ProductPageable) {
    this.totalLength = productPageable.totalElements;
    this.products = productPageable.content;
    this.dataSource = new MatTableDataSource<Product>(this.products); 
  }

  private handleError(error: HttpErrorResponse, customMessage: string) {
    this.showErrorModal = true;    
    this.showModal();
    this.errors = ErrorUtils.handleError(error, customMessage);
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }


}
