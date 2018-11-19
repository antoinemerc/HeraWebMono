import { Component, OnInit } from '@angular/core';
import { Principal, IUser, Account, UserService } from 'app/core';
import { HttpResponse } from '@angular/common/http';
import { ProductService } from 'app/shared/service/product.service';
import { IProduct } from 'app/shared/model/product.model';

/*
  TO ADD:
    Error message when the user is not connected and invite him to connect
    Error message when there is no item products in the cart
*/

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

    constructor(public principal: Principal, private productService: ProductService, private userService: UserService) {}

    ngOnInit() {
        this.principal.identity().then(account => {
            this.accountConnected = account;
            this.userService.find(this.accountConnected.login).subscribe((res: HttpResponse<IUser>) => {
                this.currentUser = res.body;
                this.productService.queryBasket(this.currentUser).subscribe((cart: HttpResponse<IProduct[]>) => {
                    this.cartProducts = cart.body;
                    this.totalCost = this.getTotalCost();
                    // console.log(this.cartProducts);
                });
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
}
