import { Component, OnInit } from "@angular/core";
import { IProduct } from "./Iproduct";
import { Product } from "./product";
import { ProductService } from "./product.service";
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    //selector: 'app-product-editor',
    templateUrl:'./new-product.component.html',
    styleUrls:['./new-product.component.css'],
    providers: [ProductService]
})
export class NewProductComponent implements OnInit {
    pageTitle: string = "New Product";
    infoMessage: string = '';
    product= new Product();
    productList: IProduct[]=[];
    errorMessage:string='';

    productForm = new FormGroup({
        productCode: new FormControl('', Validators.required),
        productName: new FormControl('', Validators.required),
        releaseDate: new FormControl('', Validators.required),
        description: new FormControl('', Validators.required),
        price: new FormControl('', Validators.required),
        starRating: new FormControl('', Validators.required)        
      });

    constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router) { }

    ngOnInit(): void{
        //this.cleanFields();
        this.infoMessage = '';
        this.errorMessage='';
        this.productService.getProducts().subscribe({
            next: products => {
                this.productList =  products;
            },
            error: err => this.errorMessage = err
        });
    }

    /*cleanFields(): void{
        this.product.productCode="";
        this.product.productName="";
        this.product.releaseDate="";
        this.product.imageUrl="";
        this.product.description="";
        this.product.starRating=0;
        this.product.price=0;
    }*/

    save(): void{
        this.infoMessage = '';
        this.errorMessage='';
        this.product=this.productForm.value;
        this.product = this.toUpperCase(this.product);
        let exists = this.productList.filter(prod=> prod.productCode.toUpperCase().trim() === this.product.productCode.toUpperCase().trim()).length > 0;
        console.log(exists);
        if (!exists){
            this.productList.push(this.product);
            this.infoMessage = 'The product was saved properly.';
            //this.productForm.reset();
        }else
            this.errorMessage='The product is not possible to be stored. It is already stored.';

        console.log(this.productList);
        console.log('saving');
    }

    toUpperCase = (prod: Product) => {
        prod.productCode = prod.productCode.toUpperCase();
        prod.description = prod.description.toUpperCase();
        prod.productName = prod.productName.toUpperCase();
        return prod;
    };

    /*cleanScreen(): void{
        this.cleanFields();
    }*/

    onBack(): void{
        this.router.navigate(['/products']);
    }
}