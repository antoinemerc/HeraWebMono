import { Component, OnInit, Input } from '@angular/core';
import { IProduct } from 'app/shared/model/product.model';

@Component({
    selector: 'jhi-my-cart-item',
    templateUrl: './my-cart-item.component.html',
    styles: []
})
export class MyCartItemComponent implements OnInit {
    @Input() cartProducts: IProduct[];
    constructor() {}

    ngOnInit() {}
}
