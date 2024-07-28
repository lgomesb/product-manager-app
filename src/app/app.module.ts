import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TemplateModule } from './template/template.module';
import { HomeComponent } from './home/home.component';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { CategoriesService } from './categories.service';
import { ProductsService } from './products.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule, 
    TemplateModule, 
    CategoriesModule,
    ProductsModule
  ],
  providers: [ 
    CategoriesService, 
    ProductsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
