import { IProduct } from "./Iproduct";

export class Product implements IProduct{
    productId: number =0;
    productName: string="";
    productCode: string="";
    releaseDate: string="";
    price: number=0;
    description: string="";
    starRating: number=0;
    imageUrl: string="";
    constructo(){}
}