import { Component, OnInit } from '@angular/core';
import { Principal, IUser, UserService, Account } from 'app/core';
import { HttpResponse } from '@angular/common/http';
import { ProductService } from 'app/shared/service/product.service';
import { IProduct } from 'app/shared/model/product.model';
import { LoginModalService } from 'app/core';
import { BasketItem } from 'app/shared/model/basket_item.model';

@Component({
    selector: 'jhi-my-cart',
    templateUrl: './my-cart.component.html',
    styles: []
})
export class MyCartComponent implements OnInit {
    currentUser: IUser;
    basket: IProduct[];
    cartProducts: IProduct[];
    loading: Boolean = false;
    emptyCart: Boolean = true;
    authenticatedStatus = false;

    constructor(
        public principal: Principal,
        private productService: ProductService,
        private userService: UserService,
        private loginService: LoginModalService
    ) {}

    ngOnInit() {
        if (this.principal.isAuthenticated()) {
            // get the identity and retrieve info
            this.principal.identity().then((userIdentity: Account) => {
                this.loadUser(userIdentity);
            });
        } else {
            // wait on an authentification and only then retrieve his information
            this.principal.getAuthenticationState().subscribe((userIdentity: Account) => {
                this.loadUser(userIdentity);
            });
        }
    }

    logIn() {
        this.loginService.open();
    }

    loadUser(account: Account) {
        if (this.principal.isAuthenticated()) {
            this.loading = true;
            this.userService.find(account.login).subscribe((res: HttpResponse<IUser>) => {
                this.currentUser = res.body;
                this.basket = this.currentUser.basket;
                this.retrieveProducts(this.currentUser.basket);
            });
        }
    }

    isCartEmpty() {
        // Peu importe la valeur si le panier est indéfini, on retourne true pour éviter une erreur
        return this.basket === undefined || this.basket.length === 0;
    }

    retrieveProducts(basket: BasketItem[]) {
        if (basket.length > 0) {
            this.emptyCart = false;
            this.productService.queryBasket(this.currentUser.basket).subscribe((cart: HttpResponse<IProduct[]>) => {
                this.loading = false;
                this.cartProducts = cart.body;
            });
        } else {
            this.loading = false;
            this.emptyCart = true;
        }
    }
}
