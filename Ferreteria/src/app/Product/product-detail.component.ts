import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from './product';

@Component({
  //selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  pageTitle: string = 'Product Detail';
  product!: IProduct;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    
    let id:any = this.route.snapshot.paramMap.get('id');
   // console.log(id);
    this.pageTitle += `: ${id}`;
    this.product= {
      "productId": id,  
        "productName": "Garden Cart",
        "productCode": "GDN-0023",
        "releaseDate": "March 18, 2019",
        "price": 32.99,
        "description":"15 gallon capacity rolling garden cart",
        "starRating": 5,
        "imageUrl": "assets/images/garden.jpg"
    }

    
  }

  onBack(): void{
     this.router.navigate(['/products']);
  }
}
