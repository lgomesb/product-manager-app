import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { OrdersFormComponent } from './orders-form/orders-form.component';

const routes: Routes = [
  { path: 'orders-list', component: OrdersListComponent },
  { path: 'orders-form', component: OrdersFormComponent },
  { path: 'orders-form/:id', component: OrdersFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
