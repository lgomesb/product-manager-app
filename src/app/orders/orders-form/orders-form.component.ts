import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { Category } from 'src/app/categories/category';
import { ProductDTO } from 'src/app/products/productDTO';
import { StandardError } from 'src/app/standard-error';
import { Order } from '../order';
import { AddProductOrderItemDialogComponent } from './add-product-order-item-dialog/add-product-order-item-dialog.component';
import { ProductOrderItem } from '../productOrderItem';
import { ProductOrder } from '../productOrder';
import { ProductsService } from 'src/app/products.service';
import { OrdersService } from 'src/app/orders.service';
import { OrderDTO } from '../orderDTO';
import { OrderItemDTO } from '../orderItemDTO';
import { Product } from 'src/app/products/product';

@Component({
  selector: 'app-orders-form',
  templateUrl: './orders-form.component.html',
  styleUrls: ['./orders-form.component.css']
})
export class OrdersFormComponent implements OnInit {

  order: Order = new Order;
  productDTO: ProductDTO = new ProductDTO;
  categories: Category[] = [];
  success: boolean = false;
  errors!: String[];
  cat01: Category = new Category();
  dataSource!: MatTableDataSource<ProductOrderItem>;
  displayedColumns: string[] = ['name', 'category', 'quantity'];
  orderItems: ProductOrderItem[] = [];
  isEditing: boolean = false;

  constructor(
    private dialog: MatDialog,
    private productsService: ProductsService,
    private service: OrdersService,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) { }


  ngOnInit(): void {
    console.log("ngOnInit");
    this.loadProductOrder();
  }

  lookupRouteParameter(): string {
    let params: Observable<Params> = this.activateRoute.params;
    let result!: string;

    params.subscribe(urlParams => result = urlParams['id']);

    return result;
  }

  onSubmit(): void {
    if (this.formValidation()) {
      console.info("I am ok", this.order);
      let orderDTO: OrderDTO = OrderDTO.create(this.order.description)
      this.order.items.forEach(item => {
        orderDTO.items.push(new OrderItemDTO(item.productId, item.quantity))
      });

      console.info(orderDTO);

      if (this.isEditing) {
        this.service.update(this.order.id!, orderDTO)
          .subscribe({
            next: (v) => console.log(v),
            error: (e) => { this.success = false; this.handleError(e) },
            complete: () => { this.success = true; this.errors = [] }
          });
      } else {
        this.service.salve(orderDTO)
          .subscribe({
            next: (v) => console.log(v),
            error: (e) => { this.success = false; this.handleError(e) },
            complete: () => { this.success = true; this.errors = [] }
          });
      }
    }

  }

  private loadProductOrder() {
    let orderId = this.lookupRouteParameter();
    let orderItem: ProductOrderItem;

    if (orderId) {
      this.isEditing = true;
      this.service.getOrderById(orderId)
        .subscribe({
          next: (item) => {
            this.order = item;
            this.order.items.forEach(i => {
              this.productsService.getProductById(i.productId)
                .subscribe({
                  next: (p) => orderItem = this.createProductOrderItem(p, i.quantity),
                  error: (e) => { this.success = false; this.handleError(e) },
                  complete: () => {
                    this.success = false;
                    this.errors = [];
                    this.orderItems.push(orderItem);
                    this.dataSource = new MatTableDataSource<ProductOrderItem>(this.orderItems);
                    console.log(`Item adicionado: ${this.orderItems.length}`);
                  }
                });

            });
          },
          error: (e) => { this.success = false; this.handleError(e); },
          complete: () => { this.success = false; this.errors = []; }
        });
    }
  }

  private formValidation(): boolean {
    let errorMsg = "";
    let valid: boolean = true;

    if (this.order.description == null) {
      this.errors = [];
      errorMsg = "Order description is empty!";
      this.errors.push(errorMsg);
      throwError(() => new Error(errorMsg));
      valid = false
    } else if (this.order.items == null || this.order.items.length === 0) {
      this.errors = [];
      errorMsg = "Order items is empty!";
      this.errors.push(errorMsg);
      throwError(() => new Error(errorMsg));
      valid = false;
    }
    return valid;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      let standardError: StandardError = error.error;
      this.errors = [standardError.message];
      console.error(`Backend returned code ${error.status}, body was: `, standardError);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  private createProductOrderItem(product: Product, quantity: number): ProductOrderItem {
    return ProductOrderItem.create(product, quantity);
  }

  rollbackOrdersList(): void {
    this.router.navigate(['/orders-list'])
  }

  openSearchDialog() {
    const dialogRef = this.dialog.open(AddProductOrderItemDialogComponent, {
      width: '60%',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(`:::::::::: ORDER ITEM selecionado:`);
        console.log(`Product: ${result.product.name}`);
        console.log(`Category: ${result.product.category.name}`);
        console.log(`Qt: ${result.quantity}`);
        let item = this.createProductOrderItem(result.product, result.quantity);
        console.log(`Order Item: ${item.quantity}`);
        this.orderItems.push(item);
        this.dataSource = new MatTableDataSource<ProductOrderItem>(this.orderItems);
        this.order.items.push(ProductOrder.create(item.product.id, item.quantity));

      } else {
        console.log('Nenhum product foi selecionada.');
      }
    });

  }


}

