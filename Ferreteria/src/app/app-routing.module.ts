import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductDetailComponent } from './Product/product-detail/product-detail.component';
import { ProductDetailGuard } from './Product/product-detail/product-detail.guard';
import { ProductListComponent } from './Product/product-list/product-list.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  // {path:'products', component: ProductListComponent},
  // {path:'products/:id', canActivate: [ProductDetailGuard], component: ProductDetailComponent},
  {path:'home', component: HomeComponent},
  //{path:'login', component: LoginComponent},
  //{path:'', redirectTo: 'login', pathMatch: 'full'},
  //{path:'**', redirectTo: 'login', pathMatch: 'full',}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
