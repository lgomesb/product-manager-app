import { Injectable } from '@angular/core';
import { Product } from './products/product';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ProductPageable } from './products/product-pageable';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  
  private HOST: String = "http://localhost:8082";
  private DEFAULT_ENDPOINT: String = `${this.HOST}/product-mgmt/product`;
  
  constructor( private http: HttpClient ) { }
  
  salve( category : Product ) : Observable<any> {
    return this.http.post(`${this.DEFAULT_ENDPOINT}`, category);
  }

  getProductById( id: String ) : Observable<any> {
    return this.http.get<any>(`${this.DEFAULT_ENDPOINT}/${id}`);  
  }
  
  getProductsPageable(page: number, pageSize: number) : Observable<ProductPageable> {
    const params = {
      page: page.toString(),
      linesPerPage: pageSize.toString()
    };

    const url = `${this.DEFAULT_ENDPOINT}?page=${params.page}&linesPerPage=${params.linesPerPage}`;
    // console.log(url);


    return this.http.get<ProductPageable>(url);  
  }
  
  getProduct() : Product {
    let product : Product = new Product();
    product.id = "213456";
    product.name = "Product 1";
    
    return product;
  }

  getProducts() : Observable<Product[]> {
    
    let products : Product[] = [];    
    let productMap : Map<string, string> = this.getProductListMock();
    productMap.forEach((value, key) => {
      products.push(Product.create(key, value));
    });

    return of(products);
  }


  private getProductListMock() : Map<string, string> {
    let productMap = new Map<string, string>();
    productMap.set("b94e5830-5a50-4951-a1cf-00f99fb57032", "Crab - Soft Shell");
    productMap.set("18a3bc43-549f-4d9c-965e-28b443024f7b", "Beans - Soya Bean");
    productMap.set("0c7e8b0f-7ab7-403d-9a08-35c64002eed8", "Wine - Prosecco Valdobienne");
    productMap.set("3b7eacc7-c54c-405b-bf41-4db54a170474", "Flower - Dish Garden");
    productMap.set("36bea858-8e10-48ed-892f-5efe5a1812a9", "Roe - Lump Fish, Black");
    productMap.set("614126cd-b41b-4f09-bcd3-b95f847c8fa1", "Steel Wool S.o.s");
    productMap.set("82f17220-1b4b-4a64-b94e-16ffb225f642", "Mikes Hard Lemonade");
    productMap.set("ed880ab3-6d16-4ce8-bc7d-de2627233ffd", "Sugar - Splenda Sweetener");
    productMap.set("fde06f1b-964d-47f1-a112-9fe80c8bc0b3", "Potatoes - Idaho 100 Count");
    productMap.set("d7b42615-30ac-4049-9a5b-4dcbe2b996c1", "Tamarillo");
    productMap.set("03557176-4a3e-4131-9526-71699604d648", "Lidsoupcont Rp12dn");
    productMap.set("d3a0ac64-9df9-469d-926f-816b80c6ca68", "Pop - Club Soda Can");
    productMap.set("b9bf347a-e297-4821-be86-8cb662683020", "Soup - Knorr, Classic Can. Chili");
    productMap.set("5560ba91-ac4f-481b-89fb-e82ba57e7178", "Dawn Professionl Pot And Pan");
    productMap.set("02e79a26-bc1a-425a-9089-d633741e4510", "Red Cod Fillets - 225g");
    productMap.set("72a28137-5e9b-4c3f-90a9-e8e2e787d852", "Pork - Sausage Casing");
    productMap.set("6cb826c4-b3a1-4eb9-932d-a00ad7591451", "Cheese - Camembert");
    productMap.set("ddd57fc0-7fb4-4851-b73f-d1460d7d0797", "Sponge Cake Mix - Vanilla");
    productMap.set("57f4c957-7876-4e5f-b3af-f4fe34b6776a", "Pastry - Cheese Baked Scones");
    productMap.set("62aadcbd-8bb2-47a5-affc-0192a03ceb8a", "Scallops - 20/30");

    return productMap;
  }
}
