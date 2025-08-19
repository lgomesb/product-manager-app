import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { throwError } from 'rxjs';
import { CategoriesService } from 'src/app/categories.service';
import { Category } from 'src/app/categories/category';
import { CategoryPageable } from 'src/app/categories/category-pageable';
import { ErrorUtils } from 'src/app/utils/error-util';


declare var bootstrap: any;

@Component({
  selector: 'app-find-categories-dialog',
  templateUrl: './find-categories-dialog.component.html',
  styleUrls: ['./find-categories-dialog.component.css']
})


export class FindCategoriesDialogComponent implements OnInit {

  categories: Category[] = [];
  dataSource!: MatTableDataSource<Category>;
  totalLength = 0;
  pageSize = 5;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  showErrorModal!: boolean;
  errors!: String[];
  displayedColumns: string[] = ['name'];


  constructor(
    public dialogRef: MatDialogRef<FindCategoriesDialogComponent>,
    private service: CategoriesService
  ) { }

  ngOnInit(): void {
    this.loadAndReloadDataSource();
  }

  loadAndReloadDataSource() {
    this.dataSource = new MatTableDataSource<Category>([]);
    this.loadCategories(0, this.pageSize);

    if (this.paginator) {
      this.paginator._changePageSize(this.paginator.pageSize);
    }
  }

  loadCategories(pageIndex: number, pageSize: number): void {
    this.service
      .getCategoriesPageable(pageIndex, pageSize)
      .subscribe({
        next: (c) => this.processCategoryPageable(c),
        error: (e) => this.handleError(e, "Error occurred when retrieving categories."),
        complete: () => { this.errors = []; this.showErrorModal = false }
      });
  }

  onPageChange(event: any) {
    this.loadCategories(event.pageIndex, event.pageSize);
  }

  onRowClicked(row: Category) {
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

  private processCategoryPageable(categoryPageable: CategoryPageable) {
    this.totalLength = categoryPageable.totalElements;
    this.categories = categoryPageable.content;
    this.dataSource = new MatTableDataSource<Category>(this.categories);
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

