import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'app/shared/model/product.model';

@Component({
    selector: 'jhi-product-item',
    templateUrl: './product-item.component.html',
    styles: []
})
export class ProductItemComponent implements OnInit {
    @Input() product: Product;

    constructor() {}

    ngOnInit() {}
}
