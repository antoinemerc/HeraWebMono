import { Component, OnInit, Input } from '@angular/core';
import { IProduct } from 'app/shared/model/product.model';
import { Order } from 'app/shared/model/order.model';
import { Principal, IUser, Account, UserService } from 'app/core';
import { HttpResponse } from '@angular/common/http';

@Component({
    selector: 'jhi-my-cart-item',
    templateUrl: './my-cart-item.component.html',
    styles: []
})
export class MyCartItemComponent implements OnInit {
    @Input() cartProducts: IProduct[];
    @Input() basket;
    accountConnected: Account;
    currentUser: IUser;
    totalCost: Number = 0;
    stockErrors = false;
    constructor(public principal: Principal, private userService: UserService) {}

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

    pay() {
        const order = new Order();
        this.principal.identity().then(account => {
            this.accountConnected = account;
            this.userService.find(this.accountConnected.login).subscribe((res: HttpResponse<IUser>) => {
                this.currentUser = res.body;
                order.user = this.currentUser;
                order.orderLine = this.currentUser.basket;
                order.date = this.createDate();
                console.log(order);
            });
        });
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

    createDate() {
        const today = new Date();
        const dd = today.getDate();
        const mm = today.getMonth() + 1;
        const yyyy = today.getFullYear();

        console.log(mm + '/' + dd + '/' + yyyy);
        return dd + '/' + mm + '/' + yyyy;
    }
}
