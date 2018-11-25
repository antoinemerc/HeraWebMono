import { Component, OnInit } from '@angular/core';
import { Principal, IUser, Account, UserService } from 'app/core';
import { HttpResponse } from '@angular/common/http';
import { ProductService } from 'app/shared/service/product.service';
import { IProduct } from 'app/shared/model/product.model';

import { LoginModalService } from 'app/core';

/*==================================================
==================================================*/

@Component({
    selector: 'jhi-my-cart',
    templateUrl: './my-cart.component.html',
    styles: []
})
export class MyCartComponent implements OnInit {
    accountConnected: Account;
    currentUser: IUser;
    basket: IProduct[];
    cartProducts: IProduct[];
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
                this.basket = res.body.basket;
                // console.log( this.basket );
                this.productService.queryBasket(this.currentUser).subscribe((cart: HttpResponse<IProduct[]>) => {
                    this.cartProducts = cart.body;
                    this.confirmation = true;
                });
            });
        });
    }

    logIn() {
        this.loginService.open();
    }

    cartIsEmpty() {
        let empty = true;
        if (this.cartProducts != null) {
            if (this.cartProducts.length > 0) {
                empty = false;
            }
        }
        return empty;
    }
}
