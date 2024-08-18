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
    // this.dataSource = new MatTableDataSource<Product>(this.products);
    this.loadProducts(0, this.pageSize);
    //this.dataSource.paginator = this.paginator;
    console.log("passei aqui 1");
  }


  ngAfterViewInit(): void {        
        
        console.log("passei aqui 2")
  }


  onPageChange(event: any) {
    // const pageIndex = event.pageIndex;
    // const pageSize = event.pageSize;
    // const startIndex = (pageIndex > 0) ? pageIndex -1: pageIndex ;
    // const endIndex = startIndex + this.products.length;
    
    this.loadProducts(event.pageIndex, event.pageSize);
    

    //this.totalLength = this.products.length;
    // this.dataSource.data = this.products.slice(startIndex, this.totalLength);
    // console.log("startIndex: " + startIndex);
    // console.log("pageIndex: " + event.pageIndex);
    // console.log("pageSize: " + event.pageSize);
    // console.log("length: " + event.length);
    // console.log("length: " + this.totalLength);
    
  }

  loadProducts(pageIndex: number, pageSize: number): void {
    console.log("pageIndex: " + pageIndex);
    console.log("pageSize: " + pageSize);

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
