import { Component } from '@angular/core';
import { Category } from '../category';

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.css']
})
export class CategoriesFormComponent {

  category: Category | undefined;

}
