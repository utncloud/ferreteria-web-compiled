import { Component, Input, OnChanges, Output, EventEmitter } from "@angular/core";

@Component({
    selector:'app-star',
    templateUrl: './star-rating.component.html',
    styleUrls:['./star-rating.component.css']
})
export class StarComponent implements OnChanges{    
    @Input() rating: number = 4;
    starWidth: number=20;
    @Output() ratingClicked: EventEmitter<string> = new EventEmitter<string>();

    onClick(){
        this.ratingClicked.emit(`The rating ${this.rating} was clicked!`);
    }

    ngOnChanges(): void{
        this.starWidth = this.rating * 75 / 5;
    }
}