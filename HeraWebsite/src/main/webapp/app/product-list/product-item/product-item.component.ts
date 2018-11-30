import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { IProduct, Product } from 'app/shared/model/product.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ImageUrlService } from 'app/shared/service/imageUrl.service';
import { Account, IUser, LoginModalService, Principal, UserService } from 'app/core';
import { HttpResponse } from '@angular/common/http';
import { BasketItem, IBasketItem } from 'app/shared/model/basket_item.model';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'app/shared';

@Component({
    selector: 'jhi-product-item',
    templateUrl: './product-item.component.html',
    styles: []
})
export class ProductItemComponent implements OnInit {
    @Input() product: Product = null;
    mainImage: SafeResourceUrl = 'content/images/bg7.jpg';
    currentUser: IUser;
    accountConnected: Account;
    newItem: IBasketItem;
    modalRef: NgbModalRef;
    basketConfirmed: number = 0;
    finished: boolean;
    id: string;
    constructor(
        private imageUrlService: ImageUrlService,
        private _sanitizer: DomSanitizer,
        private route: ActivatedRoute,
        private userService: UserService,
        private principal: Principal,
        private loginModalService: LoginModalService,
        private router: Router,
        private productService: ProductService
    ) {}

    ngOnInit() {
        if (this.product !== null) {
            if (this.product.allImageUrl.length !== 0) {
                this.imageUrlService.getOneImageFrom('heraimagescontainer', this.product.allImageUrl[0].url).subscribe(value => {
                    this.bindUrl(value);
                });
            }
        }
        this.newItem = new BasketItem(this.product.id, 1);
    }
    private bindUrl(data: SafeResourceUrl) {
        this.mainImage = data;
    }
    isAuthenticated() {
        return this.principal.isAuthenticated();
    }
    click() {
        this.basketConfirmed = 1;
        if (this.principal.isAuthenticated()) {
            this.principal.identity().then(account => {
                this.accountConnected = account;
                this.userService.find(this.accountConnected.login).subscribe((res: HttpResponse<IUser>) => {
                    this.currentUser = res.body;
                    this.currentUser.basket.push(this.newItem);
                    this.userService.updateBasket(this.newItem).subscribe(response => {
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
}
