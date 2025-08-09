import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { OrderPageable } from './orders/order-pageable';
import { Observable, of } from 'rxjs';
import { OrderDTO } from './orders/orderDTO';
import { Order } from './orders/order';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  
  private API_URL: String = environment.orderApiURL;
  private DEFAULT_ENDPOINT: String = `${this.API_URL}/`;
  
  constructor( private http: HttpClient ) { }
  
  salve( order : OrderDTO ) : Observable<any> {
    console.info(order);
    return this.http.post(`${this.DEFAULT_ENDPOINT}`, order);
  }

  update( id: String, order : OrderDTO ) : Observable<any> {
    console.info(order);
    return this.http.put(`${this.DEFAULT_ENDPOINT}/${id}`, order);
  }

  delete( id: String ) : Observable<any> {
    return this.http.delete<any>(`${this.DEFAULT_ENDPOINT}/${id}`);  
  }

  getOrderById( id: String ) : Observable<any> {
    return this.http.get<any>(`${this.DEFAULT_ENDPOINT}/${id}`);  
  }
  
  getOrdersPageable(page: number, pageSize: number) : Observable<OrderPageable> {
    const params = {
      page: page.toString(),
      linesPerPage: pageSize.toString()
    };

    const url = `${this.DEFAULT_ENDPOINT}?page=${params.page}&linesPerPage=${params.linesPerPage}`;

    return this.http.get<OrderPageable>(url);  
  }
  
  getOrder() : Order {
    let order : Order = new Order();
    order.id = "213456";
    order.description = "Order 1";
    
    return order;
  }

  getOrders() : Observable<Order[]> {
    
    let orders : Order[] = [];    
    let orderMap : Map<string, string> = this.getOrderListMock();
    orderMap.forEach((value, key) => {
      orders.push(Order.create(key, value));
    });
    return of(orders);
  }


  private getOrderListMock() : Map<string, string> {
    let orderMap = new Map<string, string>();
    orderMap.set("b94e5830-5a50-4951-a1cf-00f99fb57032", "Crab - Soft Shell");
    orderMap.set("18a3bc43-549f-4d9c-965e-28b443024f7b", "Beans - Soya Bean");
    orderMap.set("0c7e8b0f-7ab7-403d-9a08-35c64002eed8", "Wine - Prosecco Valdobienne");
    orderMap.set("3b7eacc7-c54c-405b-bf41-4db54a170474", "Flower - Dish Garden");
    orderMap.set("36bea858-8e10-48ed-892f-5efe5a1812a9", "Roe - Lump Fish, Black");
    orderMap.set("614126cd-b41b-4f09-bcd3-b95f847c8fa1", "Steel Wool S.o.s");
    orderMap.set("82f17220-1b4b-4a64-b94e-16ffb225f642", "Mikes Hard Lemonade");
    orderMap.set("ed880ab3-6d16-4ce8-bc7d-de2627233ffd", "Sugar - Splenda Sweetener");
    orderMap.set("fde06f1b-964d-47f1-a112-9fe80c8bc0b3", "Potatoes - Idaho 100 Count");
    orderMap.set("d7b42615-30ac-4049-9a5b-4dcbe2b996c1", "Tamarillo");
    orderMap.set("03557176-4a3e-4131-9526-71699604d648", "Lidsoupcont Rp12dn");
    orderMap.set("d3a0ac64-9df9-469d-926f-816b80c6ca68", "Pop - Club Soda Can");
    orderMap.set("b9bf347a-e297-4821-be86-8cb662683020", "Soup - Knorr, Classic Can. Chili");
    orderMap.set("5560ba91-ac4f-481b-89fb-e82ba57e7178", "Dawn Professionl Pot And Pan");
    orderMap.set("02e79a26-bc1a-425a-9089-d633741e4510", "Red Cod Fillets - 225g");
    orderMap.set("72a28137-5e9b-4c3f-90a9-e8e2e787d852", "Pork - Sausage Casing");
    orderMap.set("6cb826c4-b3a1-4eb9-932d-a00ad7591451", "Cheese - Camembert");
    orderMap.set("ddd57fc0-7fb4-4851-b73f-d1460d7d0797", "Sponge Cake Mix - Vanilla");
    orderMap.set("57f4c957-7876-4e5f-b3af-f4fe34b6776a", "Pastry - Cheese Baked Scones");
    orderMap.set("62aadcbd-8bb2-47a5-affc-0192a03ceb8a", "Scallops - 20/30");

    return orderMap;
  }
}