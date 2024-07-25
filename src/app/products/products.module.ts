import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsFormComponent } from './products-form/products-form.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ProductsFormComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    ProductsRoutingModule
  ], 
  exports: [
    ProductsFormComponent
  ]
})
export class ProductsModule { }
