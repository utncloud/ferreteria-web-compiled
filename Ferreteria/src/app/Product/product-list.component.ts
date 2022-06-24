import { Component, OnInit } from "@angular/core";
import { IProduct } from "./Iproduct";
import { ProductService } from "./product.service";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    //selector:"app-products", --> removed for routing configuration because is not needed
    templateUrl:'./product-list.component.html',
    styleUrls:['./product-list.component.css'],
    providers: [ProductService]
})
export class ProductListComponent implements OnInit {
    pageTitle: string = "Product List";
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;    
    _listFilter: string='';
    filteredProduct: IProduct[]=[];
    products: IProduct[] = [];
    errorMessage:string='';

    get listFilter(): string{
        return this._listFilter;
    }
    set listFilter(value: string){
        this._listFilter = value;
        this.filteredProduct = this.listFilter ? this.performFilter(this.listFilter) : this.products;
    }    
    
    constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router) { }

    addNewProduct(): void{
        this.router.navigate(['/newproduct']);
    }

    toggleImage(): void{
        this.showImage = !this.showImage;
    }

    ngOnInit(): void{
        let errorMessage: string='';
        this.productService.getProducts().subscribe({
            next: products => {
                this.products =  products;
                this.filteredProduct = this.products;
            },
            error: err => this.errorMessage = err
        });
    }

    performFilter(filterBy: string): IProduct[]{
        filterBy = filterBy.toLowerCase();
        return this.products.filter((product: IProduct) => 
            product.productName.toLowerCase().indexOf(filterBy) !== -1);
    } 

    onRatingClicked(message: string): void{
        this.pageTitle = `Product List: ${message}`;
		this.pageTitle = `Here visualize the rate: ${message}`;
    }
}