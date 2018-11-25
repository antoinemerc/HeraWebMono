import { Component, OnInit, Input } from '@angular/core';
import { IProduct } from 'app/shared/model/product.model';

@Component({
    selector: 'jhi-my-cart-item',
    templateUrl: './my-cart-item.component.html',
    styles: []
})
export class MyCartItemComponent implements OnInit {
    @Input() cartProducts: IProduct[];
    @Input() basket;
    totalCost: Number = 0;
    stockErrors = false;
    constructor() {}

    ngOnInit() {
        this.totalCost = this.getTotalCost();
    }

    getInfoProduct(_id: String) {
        let product;
        for (const p of this.cartProducts) {
            if (p.id === _id) {
                product = p;
                break;
            }
        }
        return product;
    }

    getTotalCost() {
        let total = 0;
        if (this.basket != null) {
            for (const entry of this.basket) {
                total += entry.quantity * this.getInfoProduct(entry.prod).price;
            }
        }
        return total;
    }

    verifyStock(_item) {
        console.log(_item);
        /*if ( _item.prod === '5bee87cbca2ab4315cc26237' ) {
            _item.quantity = 100000;
        }*/
        const prod = this.getInfoProduct(_item.prod);
        if (_item.quantity <= prod.quantity) {
            return true;
        } else {
            this.stockErrors = true;
            return false;
        }
    }
}
