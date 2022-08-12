import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from '../Iproduct';
import { ProductService } from "../services/product.service";
import { LoginService } from "../../login/services/login.service";

@Component({
  //selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  providers: [ProductService]
})
export class ProductDetailComponent implements OnInit {
  pageTitle: string = 'Product Detail';
  product!: IProduct;
  errorMessage:string='';

  constructor(private route: ActivatedRoute, private router: Router, private productService: ProductService, private loginService: LoginService) { }

  ngOnInit(): void {
    if (this.loginService.userAuthenticate==null){
      this.router.navigate(['/login']);
    }

    let id:any = this.route.snapshot.paramMap.get('id');
    console.log('id: '+ id);
    this.productService.getProducts().subscribe({        
        next: products => {
            let prods =  products.filter(item => item.productId==id);
            if (prods.length>0){
              this.product = prods[0]
              this.pageTitle += `: [${prods[0].productCode}]`;
            }else{
              this.errorMessage = 'Product not found.';
              console.log(this.errorMessage);
            }
        },
        error: err => this.errorMessage = err
    });    
  }

  onBack(): void{
     this.router.navigate(['/products']);
  }
}
