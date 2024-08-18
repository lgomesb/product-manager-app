import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Product } from '../product';
import { ProductsService } from 'src/app/products.service';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';





@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements AfterViewInit, OnInit {

  products: Product[] = [];
  productSelected!: Product;

  displayedColumns: string[] = ['id', 'name', 'edit'];
  dataSource! : MatTableDataSource<Product>;
  totalLength = 0;
  pageSize = 5;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private service: ProductsService,
    private router: Router) { }

  ngOnInit(): void {
    this.loadProducts(0, this.pageSize);
  }


  ngAfterViewInit(): void {        
  }


  onPageChange(event: any) {
    this.loadProducts(event.pageIndex, event.pageSize);
  }

  loadProducts(pageIndex: number, pageSize: number): void {
    this.service
      .getProductsPageable(pageIndex, pageSize)
      .subscribe((p) => {

        this.totalLength = p.totalElements;
        this.products = p.content;        
        // TODO: Verficiar esse ponto
        this.dataSource = new MatTableDataSource<Product>(this.products);
         
      });
  }


  newProduct() : void {
    this.router.navigate(['/products-form']);
  }

  readyProduct(product: Product): void {

  }

  deleteProduct(): void {
    
  }

}
