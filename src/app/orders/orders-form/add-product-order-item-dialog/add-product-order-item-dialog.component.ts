import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Category } from 'src/app/categories/category';
import { Product } from 'src/app/products/product';
import { FindProductsDialogComponent } from 'src/app/products/products-dialog/find-products-dialog/find-products-dialog.component';
import { FindCategoriesDialogComponent } from 'src/app/products/products-form/find-categories-dialog/find-categories-dialog.component';
import { ProductOrderItem } from '../../productOrderItem';

@Component({
  selector: 'app-add-product-order-item-dialog',
  templateUrl: './add-product-order-item-dialog.component.html',
  styleUrls: ['./add-product-order-item-dialog.component.css']
})
export class AddProductOrderItemDialogComponent {

  product: Product = new Product;
  quantity!: number; 
  category!: Category;

  constructor(
    private dialog: MatDialog, 
    public dialogRef: MatDialogRef<AddProductOrderItemDialogComponent>
  ) {

  }


  openCategoriesSearchDialog() {
    const categoryDialog = this.dialog.open(FindCategoriesDialogComponent, {
      width: '600px',
      data: {} // dados opcionais
    });

    categoryDialog.afterClosed().subscribe(result => {
      if (result) {
        this.category = new Category();
        this.category.id = result.id;
        this.category.name = result.name
        console.log(`Categoria selecionada: ${result.name}`);
      } else {
        console.log('Nenhuma categoria foi selecionada.');
      }
    });

  }

  openProductsSearchDialog() {
    const productDialog = this.dialog.open(FindProductsDialogComponent, {
      width: '600px',
      data: this.category.id
    });

    productDialog.afterClosed().subscribe(result => {
      if (result) {
        this.product = new Product();
        this.product.id = result.id;
        this.product.name = result.name;
        this.product.category = this.category;

        console.log(`Produto selecionado: ${result.name}`);
      } else {
        console.log('Nenhum product foi selecionada.');
      }
    });

  }

  cancel() {
    this.dialog.closeAll();
  }

  onAddClicked() {
    let productOrderItem = ProductOrderItem.create(this.product, this.quantity);

    this.dialogRef.close(productOrderItem);
  }

  blockNegative(event: KeyboardEvent) {
    if (event.key === '-' || event.key === 'e' || event.key === '+' || event.key === '.') {
      event.preventDefault();
    }
  }

  onInputChange() {
    if (isNaN(this.quantity)) {
      this.quantity = 1;
    } else if (this.quantity < 1) {
      this.quantity = 1;
    }
  }

}
