import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductDetailGuard } from './product-detail/product-detail.guard';
import { NewProductComponent } from './new-product/new-product.component';

const routes: Routes = [
  {path:'products', component: ProductListComponent},
  {path:'newproduct', component: NewProductComponent},
  {path:'products/:id', canActivate: [ProductDetailGuard], component: ProductDetailComponent}  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
