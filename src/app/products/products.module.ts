import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsFormComponent } from './products-form/products-form.component';
import { FormsModule } from '@angular/forms';
import { ProductsListComponent } from './products-list/products-list.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { FindCategoriesDialogComponent } from './products-form/find-categories-dialog/find-categories-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FindProductsDialogComponent } from './products-dialog/find-products-dialog/find-products-dialog.component';



@NgModule({
  declarations: [
    ProductsFormComponent,
    ProductsListComponent,
    FindCategoriesDialogComponent,
    FindProductsDialogComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    ProductsRoutingModule,
    MatPaginatorModule, 
    MatTableModule, 
    MatFormFieldModule,
    MatInputModule
  ], 
  exports: [
    ProductsFormComponent
  ]
})
export class ProductsModule { }
