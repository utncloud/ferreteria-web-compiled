import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductDetailComponent } from './Product/product-detail.component';
import { ProductDetailGuard } from './Product/product-detail.guard';
import { ProductListComponent } from './Product/product-list.component';

const routes: Routes = [
  // {path:'products', component: ProductListComponent},
  // {path:'products/:id', canActivate: [ProductDetailGuard], component: ProductDetailComponent},
  {path:'home', component: HomeComponent},
  {path:'', redirectTo: 'home', pathMatch: 'full'},
  {path:'**', redirectTo: 'home', pathMatch: 'full',}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
