import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IProduct } from '../../shared/model/product.model';
import { IBasketItem, BasketItem } from '../../shared/model/basket_item.model';
import { ProductService } from './../../entities/product/product.service';
import { HttpResponse } from '@angular/common/http';
import { LoginModalService, Principal, UserService, IUser, Account } from 'app/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'jhi-product-page',
    templateUrl: './product-page.component.html',
    styles: []
})
export class ProductPageComponent implements OnInit {
    product: IProduct;
    id: string;
    modalRef: NgbModalRef;
    finished: boolean;
    basketConfirmed: boolean;
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
        this.basketConfirmed = false;
        this.route.params.subscribe((params: Params) => (this.id = params['id']));
        this.productService.find(this.id).subscribe((res: HttpResponse<IProduct>) => this.bindBody(res.body));
        if (this.principal.isAuthenticated) {
            console.log('tst');
            this.principal.identity().then(account => {
                this.accountConnected = account;
                this.userService.find(this.accountConnected.login).subscribe((res: HttpResponse<IUser>) => (this.currentUser = res.body));
            });
        }
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    click() {
        this.currentUser.basket.push(this.newItem);
        this.userService.update(this.currentUser).subscribe(response => {
            if (response.status === 200) {
                console.log('p');
            } else {
                console.log('k');
            }
        });
        this.basketConfirmed = true;
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }

    private bindBody(data: IProduct) {
        this.product = data;
        this.newItem = new BasketItem(this.id);
        this.finished = true;
    }
}
