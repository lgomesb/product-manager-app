import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { OrdersDialogComponent } from './orders-dialog/orders-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { OrdersFormComponent } from './orders-form/orders-form.component';
import { AddProductOrderItemDialogComponent } from './orders-form/add-product-order-item-dialog/add-product-order-item-dialog.component';


@NgModule({
  declarations: [
    OrdersListComponent,
    OrdersDialogComponent,
    OrdersFormComponent,
    AddProductOrderItemDialogComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    OrdersRoutingModule,
    MatPaginatorModule,
    MatTableModule,
    MatIconModule, 
    MatButtonModule,
    MatDialogModule
  ],
  exports: [
    OrdersListComponent
  ]
})
export class OrdersModule { }
