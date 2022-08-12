import { Component, OnInit } from "@angular/core";
import { IProduct } from "../Iproduct";
import { Product } from "../product";
import { ProductService } from "../services/product.service";
import { ActivatedRoute, Router } from '@angular/router';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { LoginService } from "../../login/services/login.service";

@Component({
    //selector: 'app-product-editor',
    templateUrl:'./new-product.component.html',
    styleUrls:['./new-product.component.css'],
    providers: [ProductService]
})
export class NewProductComponent implements OnInit {
    pageTitle: string = "Add New Product";
    infoMessage: string = '';
    product= new Product();
    productList: IProduct[]=[];
    errorMessage:string='';

    productForm = new UntypedFormGroup({
        productCode: new UntypedFormControl('', Validators.required),
        productName: new UntypedFormControl('', Validators.required),
        releaseDate: new UntypedFormControl('', Validators.required),
        description: new UntypedFormControl('', Validators.required),
        price: new UntypedFormControl('', Validators.required),
        starRating: new UntypedFormControl('', Validators.required)        
      });

    constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router, private loginService:LoginService) { }

    ngOnInit(): void{
        if (this.loginService.userAuthenticate==null){
            this.router.navigate(['/login']);
          }
          
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
        let existsproductNm = this.productList.filter(prod=> prod.productName.toUpperCase().trim() === this.product.productName.toUpperCase().trim()).length > 0;
        console.log(exists);
        if (!exists && !existsproductNm){
            this.productList.push(this.product);
            this.infoMessage = 'The product was saved properly.';
            //this.productForm.reset();
        }else
            this.errorMessage='The product is not already stored and no possible to be stored. Please check the product code and product name';

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