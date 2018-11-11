import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'app/shared/model/product.model';

@Component({
    selector: 'jhi-item-product',
    templateUrl: './item-product.component.html',
    styles: []
})
export class ItemProductComponent implements OnInit {
    @Input() product: Product;

    constructor() {}

    ngOnInit() {}
}
