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
  dataSource!: MatTableDataSource<Product>;
  totalLength = this.products.length;
  pageSize = 5;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private service: ProductsService,
    private router: Router) { }

  ngOnInit(): void {
    this.loadProducts();
    this.dataSource = new MatTableDataSource<Product>(this.products);
  }


  ngAfterViewInit(): void {
        this.dataSource.paginator = this.paginator;
  }


  onPageChange(event: any) {
    const pageIndex = event.pageIndex;
    const pageSize = event.pageSize;
    const startIndex = pageIndex * pageSize;
    const endIndex = startIndex + this.products.length;
    this.totalLength = this.products.length;
    this.dataSource.data = this.products.slice(startIndex, endIndex);
    console.log("endIndex: " + endIndex);
    
  }

  loadProducts(): void {
    this.service
      .getProducts()
      .subscribe((p) => this.products = p);
  }


  newProduct() : void {
    this.router.navigate(['/products-form']);
  }

  readyProduct(product: Product): void {

  }

  deleteProduct(): void {
    
  }

}
