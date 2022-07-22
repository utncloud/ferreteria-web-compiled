import { NgModule } from '@angular/core';
import { ProductListComponent } from './product-list/product-list.component';
import { ConverttoSpacesPipe } from '../shared/convert-to-spaces.pipe';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductRoutingModule } from './product-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NewProductComponent } from './new-product/new-product.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ProductListComponent
    , ConverttoSpacesPipe    
    , ProductDetailComponent
    , NewProductComponent
  ],
  imports: [    
    ProductRoutingModule,    
    SharedModule,
    ReactiveFormsModule
  ]
})
export class ProductModule { }
