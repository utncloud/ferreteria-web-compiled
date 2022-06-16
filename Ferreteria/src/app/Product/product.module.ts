import { NgModule } from '@angular/core';
import { ProductListComponent } from './product-list.component';
import { ConverttoSpacesPipe } from '../shared/convert-to-spaces.pipe';
import { ProductDetailComponent } from './product-detail.component';
import { ProductRoutingModule } from './product-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NewProductComponent } from './new-product.component';



@NgModule({
  declarations: [
    ProductListComponent
    , ConverttoSpacesPipe    
    , ProductDetailComponent
    , NewProductComponent
  ],
  imports: [    
    ProductRoutingModule,    
    SharedModule
  ]
})
export class ProductModule { }
