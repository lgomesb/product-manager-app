import { Component, OnInit } from '@angular/core';
import { Category } from '../category';
import { CategoriesService } from 'src/app/categories.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements OnInit {

  categories: Category[] = [];
  categorySelected!: Category;

  constructor(
    private service: CategoriesService, 
    private router: Router) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  newCategory() : void {
    this.router.navigate(['/categories-form']);
  }

  readyCategory(category: Category): void {

  }

  deleteCustomer(): void {
    
  }

  loadCategories(): void {
    this.service
      .getCategories()
      .subscribe((c) => this.categories = c);
  }



}
