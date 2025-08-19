import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Order } from '../order';
import { OrdersService } from 'src/app/orders.service';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { ErrorUtils } from 'src/app/utils/error-util';
import { OrderPageable } from '../order-pageable';
import { MatDialog } from '@angular/material/dialog';
import { OrdersDialogComponent } from '../orders-dialog/orders-dialog.component';

declare var bootstrap: any; 

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent implements AfterViewInit, OnInit {

  orders: Order[] = [];
  orderSelected!: Order;

  displayedColumns: string[] = ['description', 'actions', 'edit'];
  dataSource! : MatTableDataSource<Order>;
  totalLength = 0;
  pageSize = 5;
  errors!: String[];
  showErrorModal!: boolean;
  expandedOrder: Order | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private service: OrdersService,
    private router: Router) { }

  ngOnInit(): void {
    this.loadAndReloadDataSource();   
  }

  toggle(element: Order) {
    this.expandedOrder = this.isExpanded(element) ? null : element;
  }

  ngAfterViewInit(): void {    
  }

  isExpanded(element: Order): boolean {
    return this.expandedOrder === element;
  }

  loadAndReloadDataSource() { 
    this.dataSource = new MatTableDataSource<Order>([]);
    this.loadOrders(0, this.pageSize);

    if(this.paginator) {
      this.paginator._changePageSize(this.paginator.pageSize);
    }

  }

  onPageChange(event: any) {
    this.loadOrders(event.pageIndex, event.pageSize);
  }

  loadOrders(pageIndex: number, pageSize: number): void {
      this.service
      .getOrdersPageable(pageIndex, pageSize)
      .subscribe({
        next: (p) => this.processOrderPageable(p),
        error: (e) => {this.handleError(e, "Error occurred when retrieving orders.");}, 
        complete: () => {this.errors = []; this.showErrorModal = false}
      });

  }


  newOrder() : void {
    this.router.navigate(['/orders-form']);
  }

  readyOrder(order: Order): void {
    this.orderSelected = order;
  }

  deleteOrder(): void {
    this.service
    .delete(this.orderSelected.id)
    .subscribe(
      {
        error: (e) => {this.handleError(e, "Error occurred when deleting the order.")}, 
        complete: () => {this.loadAndReloadDataSource()}         
      } 
    );
  }

  showModal() : void {
    const modelElement = document.getElementById("modalError");
    console.info(`Passei aqui: ShowModal ${this.showErrorModal}`);

    if(modelElement) {
      const model = new bootstrap.Modal(modelElement);
      model.show();
    }
  }

  closeModal(): void {
    this.showErrorModal = false;
  }

  private processOrderPageable(orderPageable: OrderPageable) {
    this.totalLength = orderPageable.totalElements;
    this.orders = orderPageable.content;

    for (let order of this.orders) {
      console.info(`Order: ${order.id} - ${order.description}`);
      for (let item of order.items) {
        console.info(`Item: ${item.productId} - ${item.quantity}`);
      } 
    }

    this.dataSource = new MatTableDataSource<Order>(this.orders); 
  }

  private handleError(error: HttpErrorResponse, customMessage: string) {
    this.showErrorModal = true;    
    this.showModal();
    this.errors = ErrorUtils.handleError(error, customMessage);
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  onRowClick(order: Order): void {
    this.dialog.open(OrdersDialogComponent, {
      width: '400px',
      data: order
    } );
  }



}
