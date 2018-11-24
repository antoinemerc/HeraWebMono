import { Component, OnInit } from '@angular/core';
import { Principal, IUser, Account, UserService } from 'app/core';
import { HttpResponse } from '@angular/common/http';
import { ProductService } from 'app/shared/service/product.service';
import { IProduct } from 'app/shared/model/product.model';
import { Order } from '../shared/model/order.model';
import { LoginModalService } from 'app/core';

@Component({
    selector: 'jhi-my-cart',
    templateUrl: './my-cart.component.html',
    styles: []
})
export class MyCartComponent implements OnInit {
    accountConnected: Account;
    currentUser: IUser;
    cartProducts: IProduct[];
    totalCost: Number = 0;
    confirmation: Boolean = false;

    constructor(
        public principal: Principal,
        private productService: ProductService,
        private userService: UserService,
        private loginService: LoginModalService
    ) {}

    ngOnInit() {
        this.principal.identity().then(account => {
            this.accountConnected = account;
            this.userService.find(this.accountConnected.login).subscribe((res: HttpResponse<IUser>) => {
                this.currentUser = res.body;
                this.productService.queryBasket(this.currentUser).subscribe((cart: HttpResponse<IProduct[]>) => {
                    this.cartProducts = cart.body;
                    this.totalCost = this.getTotalCost();
                    this.confirmation = true;
                });
            });
        });
    }

    createDate() {
        const today = new Date();
        const dd = today.getDate();
        const mm = today.getMonth() + 1;
        const yyyy = today.getFullYear();

        console.log(mm + '/' + dd + '/' + yyyy);
        return dd + '/' + mm + '/' + yyyy;
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
                order.totalPrice = this.getTotalCost();
                console.log(order);
            });
        });
    }

    getTotalCost() {
        let total = 0;
        for (const entry of this.cartProducts) {
            total += entry.quantity * entry.price;
        }
        return total;
    }

    logIn() {
        this.loginService.open();
    }

    cartIsEmpty() {
        let empty = true;
        if (this.cartProducts.length > 0) {
            empty = false;
        }
        return empty;
    }
}
