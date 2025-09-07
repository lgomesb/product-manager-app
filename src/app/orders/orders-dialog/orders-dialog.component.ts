import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductOrderDetails } from '../productOrderDetails';
import { OrderDetails } from '../order-details';

@Component({
  selector: 'app-orders-dialog',
  templateUrl: './orders-dialog.component.html',
  styleUrls: ['./orders-dialog.component.css']
})
export class OrdersDialogComponent implements OnInit {

  products: ProductOrderDetails[] = [];

  constructor(
    public dialogRef: MatDialogRef<OrdersDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public order: OrderDetails
  ) {  }

  ngOnInit(): void {
    console.info(this.order);

  }

  fechar(): void {
    this.dialogRef.close();
  }


}
