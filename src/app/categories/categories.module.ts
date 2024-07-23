import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesFormComponent } from './categories-form/categories-form.component';


@NgModule({
  declarations: [
    CategoriesFormComponent
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule
  ],
  exports: [
    CategoriesFormComponent
  ]
})
export class CategoriesModule { }
