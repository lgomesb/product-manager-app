import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsFormComponent } from './products-form/products-form.component';
import { FormsModule } from '@angular/forms';
import { ProductsListComponent } from './products-list/products-list.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';



@NgModule({
  declarations: [
    ProductsFormComponent,
    ProductsListComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    ProductsRoutingModule,
    MatPaginatorModule, 
    MatTableModule
  ], 
  exports: [
    ProductsFormComponent
  ]
})
export class ProductsModule { }
