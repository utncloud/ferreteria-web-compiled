import { Component, OnInit } from "@angular/core";
import { IProduct } from "./Iproduct";
import { Product } from "./product";
import { ProductService } from "./product.service";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    templateUrl:'./new-product.component.html',
    styleUrls:['./new-product.component.css'],
    providers: [ProductService]
})
export class NewProductComponent implements OnInit {
    pageTitle: string = "New Product";
    product= new Product();
    productList: IProduct[]=[];
    errorMessage:string='';

    constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router) { }

    ngOnInit(): void{
        this.cleanFields();
        let errorMessage: string='';
        this.productService.getProducts().subscribe({
            next: products => {
                this.productList =  products;
            },
            error: err => this.errorMessage = err
        });
    }

    cleanFields(): void{
        this.product.productCode="";
        this.product.productName="";
        this.product.releaseDate="";
        this.product.imageUrl="";
        this.product.description="";
        this.product.starRating=0;
        this.product.price=0;
    }

    save(): void{
        let exists = this.productList.filter(prod=> prod.productCode=== this.product.productCode).length > 0;
        if (!exists){
            this.productList.push(this.product);
            this.cleanFields();
        }       
    }

    cleanScreen(): void{
        this.cleanFields();
    }

    onBack(): void{
        this.router.navigate(['/products']);
    }
}