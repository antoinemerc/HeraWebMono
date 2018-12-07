import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { Product } from 'app/shared/model/product.model';
import { SafeResourceUrl } from '@angular/platform-browser';
import { ImageUrlService } from 'app/shared/service/imageUrl.service';
import { Account, IUser, Principal, UserService } from 'app/core';
import { BasketItem, IBasketItem } from 'app/shared/model/basket_item.model';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CartCountService } from '../../shared/service/cart-count.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    finished: boolean;
    id: string;
    constructor(
        private imageUrlService: ImageUrlService,
        private userService: UserService,
        private principal: Principal,
        private cartCountService: CartCountService,
        private mysnack: MatSnackBar
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
        if (this.principal.isAuthenticated()) {
            this.userService.updateBasket(this.newItem).subscribe(response => {
                if (response.status === 200) {
                    this.cartCountService.update(1);
                    this.mysnack.open(this.product.name + ' add to cart !');
                }
            });
        }
    }
}
