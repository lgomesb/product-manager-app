import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesFormComponent } from './categories-form/categories-form.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CategoriesFormComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    CategoriesRoutingModule
  ],
  exports: [
    CategoriesFormComponent
  ]
})
export class CategoriesModule { }
