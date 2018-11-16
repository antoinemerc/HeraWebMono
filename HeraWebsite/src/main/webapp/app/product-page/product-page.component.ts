import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IProduct } from '../shared/model/product.model';
import { IBasketItem, BasketItem } from '../shared/model/basket_item.model';
import { ProductService } from '../entities/product/product.service';
import { HttpResponse } from '@angular/common/http';
import { LoginModalService, Principal, UserService, IUser, Account } from 'app/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'jhi-product-page',
    templateUrl: './product-page.component.html',
    styleUrls: ['product-page.component.scss']
})
export class ProductPageComponent implements OnInit {
    product: IProduct;
    id: string;
    modalRef: NgbModalRef;
    finished: boolean;
    basketConfirmed: number;
    newItem: IBasketItem;
    currentUser: IUser;
    accountConnected: Account;

    constructor(
        private route: ActivatedRoute,
        private loginModalService: LoginModalService,
        private router: Router,
        private productService: ProductService,
        private principal: Principal,
        private userService: UserService
    ) {}

    ngOnInit() {
        this.finished = false;
        this.basketConfirmed = 0;
        this.route.params.subscribe((params: Params) => (this.id = params['id']));
        this.productService.find(this.id).subscribe((res: HttpResponse<IProduct>) => this.bindBody(res.body));
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    productAvailable() {
        return this.product.quantity > 0;
    }

    click() {
        this.basketConfirmed = 1;
        if (this.principal.isAuthenticated()) {
            this.principal.identity().then(account => {
                this.accountConnected = account;
                this.userService.find(this.accountConnected.login).subscribe((res: HttpResponse<IUser>) => {
                    this.currentUser = res.body;
                    this.currentUser.basket.push(this.newItem);
                    this.userService.update(this.currentUser).subscribe(response => {
                        if (response.status === 200) {
                            this.basketConfirmed = 2;
                        } else {
                            this.basketConfirmed = -1;
                        }
                    });
                });
            });
        }
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }

    quantityValid() {
        return this.newItem.quantity > 0 && this.newItem.quantity <= this.product.quantity;
    }

    private bindBody(data: IProduct) {
        this.product = data;
        this.newItem = new BasketItem(this.id, 1);
        this.finished = true;
    }
}
