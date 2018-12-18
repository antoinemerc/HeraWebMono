import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { Product } from 'app/shared/model/product.model';
import { SafeResourceUrl } from '@angular/platform-browser';
import { ImageUrlService } from 'app/shared/service/imageUrl.service';
import { Account, IUser, Principal, UserService } from 'app/core';
import { BasketItem, IBasketItem } from 'app/shared/model/basket_item.model';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CartCountService } from '../../shared/service/cart-count.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

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
    id: string;
    requestStatus: number;

    constructor(
        private imageUrlService: ImageUrlService,
        private userService: UserService,
        private principal: Principal,
        private cartCountService: CartCountService,
        private mysnack: MatSnackBar,
        private translateService: TranslateService
    ) {}

    ngOnInit() {
        if (this.product !== null) {
            if (this.product.allImageUrl.length !== 0) {
                this.imageUrlService.getOneImageFrom('heraimagescontainer', this.product.allImageUrl[0].url).subscribe(value => {
                    this.bindUrl(value);
                });
            }
        }
        this.requestStatus = 1;
        this.newItem = new BasketItem(this.product.id, 1);
    }

    private bindUrl(data: SafeResourceUrl) {
        this.mainImage = data;
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    canPressButton() {
        return this.requestStatus === 1;
    }

    click() {
        if (this.principal.isAuthenticated() && this.requestStatus === 1) {
            this.requestStatus = 2;
            this.userService.updateBasket(this.newItem).subscribe(response => {
                if (response.status === 200) {
                    this.cartCountService.update(1);
                    this.requestStatus = 1;
                    this.mysnack.open(this.product.name + ' added to cart !', null, {
                        duration: 2500,
                        verticalPosition: 'bottom',
                        horizontalPosition: 'end'
                    });
                }
            });
        }
    }
}
