import { Component, OnInit, ViewChild } from '@angular/core';
import { Category } from '../category';
import { CategoriesService } from 'src/app/categories.service';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

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

  loadCategories(): void {
    this.service
      .getCategories()
      .subscribe((c) => this.categories = c);
  }

  loadAndReloadDataSource() {
    this.dataSource = new MatTableDataSource<Category>([]);
    this.loadCategory(0, this.pageSize);

    if(this.paginator) {
      this.paginator._changePageSize(this.paginator.pageSize);
    }
  }

  loadCategory(pageIndex: number, pageSize: number): void {
    this.service
      .getCategoriesPageable(pageIndex, pageSize)
      .subscribe((c) => {
        this.totalLength = c.totalElements;
        this.categories = c.content;

        this.dataSource = new MatTableDataSource<Category>(this.categories);

      });
  }

  onPageChange(event: any) {
    this.loadCategory(event.pageIndex, event.pageSize);
  }


}
