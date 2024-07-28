import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesFormComponent } from './categories-form/categories-form.component';
import { FormsModule } from '@angular/forms';
import { CategoriesListComponent } from './categories-list/categories-list.component';


@NgModule({
  declarations: [
    CategoriesFormComponent,
    CategoriesListComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    CategoriesRoutingModule
  ],
  exports: [
    CategoriesFormComponent, 
    CategoriesListComponent
  ]
})
export class CategoriesModule { }
