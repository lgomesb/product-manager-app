import { Component, OnInit } from '@angular/core';
import { Category } from '../category';

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.css']
})
export class CategoriesFormComponent implements OnInit {
  
  category: Category = new Category;
  
  ngOnInit(): void {
    
    this.category.id = "1";
    this.category.name = "Category test 1";
  
  }



}
