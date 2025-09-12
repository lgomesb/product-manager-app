import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Category } from 'src/app/categories/category';
import { Product } from 'src/app/products/product';
import { FindCategoriesDialogComponent } from 'src/app/products/products-form/find-categories-dialog/find-categories-dialog.component';

@Component({
  selector: 'app-add-product-order-item-dialog',
  templateUrl: './add-product-order-item-dialog.component.html',
  styleUrls: ['./add-product-order-item-dialog.component.css']
})
export class AddProductOrderItemDialogComponent {

  product: Product = new Product;
  category!: Category;

  constructor(private dialog: MatDialog) {

  }


  openSearchDialog() {
    const dialogRef = this.dialog.open(FindCategoriesDialogComponent, {
      width: '600px',
      data: {} // dados opcionais
    });

    dialogRef.afterClosed().subscribe(result => {
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

}
