import { Component, OnInit, ViewChild } from '@angular/core';
import { Category } from '../category';
import { CategoriesService } from 'src/app/categories.service';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorUtils } from 'src/app/utils/error-util';
import { throwError } from 'rxjs';
import { CategoryPageable } from '../category-pageable';

declare var bootstrap: any; 

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements OnInit {

  categories: Category[] = [];
  categorySelected!: Category;
  displayedColumns: string[] = ['name', 'edit'];
  dataSource! : MatTableDataSource<Category>;
  totalLength = 0;
  pageSize = 5;
  errors!: String[];
  showErrorModal!: boolean;


  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private service: CategoriesService, 
    private router: Router) { }

  ngOnInit(): void {
    this.loadAndReloadDataSource();
  }

  newCategory() : void {
    this.router.navigate(['/categories-form']);
  }

  readyCategory(category: Category): void {
    this.categorySelected = category;
  }

  deleteCategory(): void {
    this.service
      .delete(this.categorySelected.id)
      .subscribe(
        {
          error: (e) => {console.error(e)}, 
          complete: () => {this.loadAndReloadDataSource()}         
        } 
      );
  }

  loadAndReloadDataSource() {
    this.dataSource = new MatTableDataSource<Category>([]);
    this.loadCategories(0, this.pageSize);

    if(this.paginator) {
      this.paginator._changePageSize(this.paginator.pageSize);
    }
  }

  onPageChange(event: any) {
    this.loadCategories(event.pageIndex, event.pageSize);
  }

  loadCategories(pageIndex: number, pageSize: number): void {
    this.service
      .getCategoriesPageable(pageIndex, pageSize)
      .subscribe({
          next: (c) => this.processCategoryPageable(c),
          error: (e) => this.handleError(e, "Error occurred when retrieving categories."),
          complete: () => {this.errors = []; this.showErrorModal = false}
      });
  }
  
  showModal() : void {
    const modelElement = document.getElementById("modalError");
    console.info(`Passei aqui: ShowModal ${this.showErrorModal}`);

    if(modelElement) {
      const model = new bootstrap.Modal(modelElement);
      model.show();
    }
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

}
