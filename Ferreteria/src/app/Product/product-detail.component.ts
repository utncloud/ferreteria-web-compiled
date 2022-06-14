import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from './product';
import { ProductService } from "./product.service";

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

  constructor(private route: ActivatedRoute, private router: Router, private productService: ProductService) { }

  ngOnInit(): void {
    let id:any = this.route.snapshot.paramMap.get('id');
    this.pageTitle += `: ${id}`;

    this.productService.getProducts().subscribe({        
        next: products => {
            let prods =  products.filter(item => item.productId==id);
            if (prods.length>0)
              this.product = prods[0]
        },
        error: err => this.errorMessage = err
    });

    /*this.product= {
      "productId": id,  
        "productName": "Garden Cart",
        "productCode": "GDN-0023",
        "releaseDate": "March 18, 2019",
        "price": 32.99,
        "description":"15 gallon capacity rolling garden cart",
        "starRating": 5,
        "imageUrl": "assets/images/garden.jpg"
    }*/

    
  }

  onBack(): void{
     this.router.navigate(['/products']);
  }
}
