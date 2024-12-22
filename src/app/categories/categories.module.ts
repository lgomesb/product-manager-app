import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesFormComponent } from './categories-form/categories-form.component';
import { FormsModule } from '@angular/forms';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';


@NgModule({
  declarations: [
    CategoriesFormComponent,
    CategoriesListComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    CategoriesRoutingModule,
    MatPaginatorModule, 
    MatTableModule
  ],
  exports: [
    CategoriesFormComponent, 
    CategoriesListComponent
  ]
})
export class CategoriesModule { }
