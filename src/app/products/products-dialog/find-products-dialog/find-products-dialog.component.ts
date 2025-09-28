import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductsService } from 'src/app/products.service';
import { Product } from '../../product';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ProductPageable } from '../../product-pageable';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorUtils } from 'src/app/utils/error-util';
import { throwError } from 'rxjs';

declare var bootstrap: any;

@Component({
  selector: 'app-find-products-dialog',
  templateUrl: './find-products-dialog.component.html',
  styleUrls: ['./find-products-dialog.component.css']
})
export class FindProductsDialogComponent implements OnInit {

  products: Product[] = [];
  dataSource!: MatTableDataSource<Product>;
  totalLength = 0;
  pageSize = 5;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  showErrorModal!: boolean;
  errors!: String[];
  displayedColumns: string[] = ['name'];

  constructor(
    public dialogRef: MatDialogRef<FindProductsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public categoryId: String,
    private service: ProductsService
  ) { }

  ngOnInit(): void {
    this.loadAndReloadDataSource();
  }

  loadAndReloadDataSource() {
    this.dataSource = new MatTableDataSource<Product>([]);
    this.loadProducts(0, this.pageSize);

    if (this.paginator) {
      this.paginator._changePageSize(this.paginator.pageSize);
    }
  }

  loadProducts(pageIndex: number, pageSize: number): void {
    this.service
      .getProductByCategory(this.categoryId)
      .subscribe({
        next: (c) => this.processProductsPageable(c),
        error: (e) => this.handleError(e, "Error occurred when retrieving products."),
        complete: () => { this.errors = []; this.showErrorModal = false }
      });
  }

  onPageChange(event: any) {
    this.loadProducts(event.pageIndex, event.pageSize);
  }

  onRowClicked(row: Product) {
    console.info(`Row clicked: ${row.name}`);
    this.dialogRef.close(row);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  cancel() {
    this.dialogRef.close();
  }

  private processProductsPageable(categoryPageable: ProductPageable) {
    this.totalLength = categoryPageable.totalElements;
    this.products = categoryPageable.content;
    this.dataSource = new MatTableDataSource<Product>(this.products);
  }


  private handleError(error: HttpErrorResponse, customMessage: string) {
    this.showErrorModal = true;
    this.showModal();
    this.errors = ErrorUtils.handleError(error, customMessage);
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  private showModal(): void {
    const modelElement = document.getElementById("modalError");
    console.info(`Passei aqui: ShowModal ${this.showErrorModal}`);

    if (modelElement) {
      const model = new bootstrap.Modal(modelElement);
      model.show();
    }
  }

}

