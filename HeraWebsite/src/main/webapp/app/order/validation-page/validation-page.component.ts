import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Principal } from 'app/core';
import { Location } from '@angular/common';
import { IOrder } from 'app/shared/model/order.model';
import { SafeResourceUrl } from '@angular/platform-browser';
import { ImageUrlService } from 'app/shared/service/imageUrl.service';

import { BUCKET_NAME } from 'app/app.constants';
import { IProduct } from 'app/shared/model/product.model';
import { ProductService } from 'app/shared';
import { UserService } from '../../core/user/user.service';
import { IBasketItem } from '../../shared/model/basket_item.model';
import { CartCountService } from '../../shared/service/cart-count.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'jhi-validation-page',
    templateUrl: './validation-page.component.html',
    styleUrls: ['validation-page.component.scss']
})
export class ValidationPageComponent implements OnInit, OnChanges {
    @Input() order: IOrder;
    cartProducts: IProduct[];

    constructor(
        private principal: Principal,
        private router: Router,
        private location: Location,
        private productService: ProductService,
        private imageUrlService: ImageUrlService,
        private userService: UserService,
        private cartCountService: CartCountService,
        private mySnack: MatSnackBar
    ) {}

    ngOnInit() {
        if (!this.principal.isAuthenticated()) {
            this.location.replaceState('/');
            this.router.navigate(['/']);
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.productService.queryBasket(this.order.orderLine).subscribe((cart: HttpResponse<IProduct[]>) => {
            this.cartProducts = cart.body;
        });
    }

    validate() {
        // Add navigation in data AND err
        this.productService.queryUpdateOrder(this.order).subscribe(
            data => {
                this.order = data.body;
                console.log('Order created' + this.order.id);
                const emptyBasket: IBasketItem[] = [];
                this.cartCountService.reset();
                this.mySnack.open('Your order was successfully created !', null, {
                    duration: 2500,
                    verticalPosition: 'bottom',
                    horizontalPosition: 'end'
                });
                this.userService.updateCartAfterRemove(emptyBasket).subscribe();
            },
            err => {
                this.mySnack.open('An error occured when creating the order, one or several products are no longer available !', null, {
                    duration: 2500,
                    verticalPosition: 'bottom',
                    horizontalPosition: 'end'
                });
            }
        );
    }

    getImage(product: IProduct): SafeResourceUrl {
        let image: SafeResourceUrl = null;
        if (product.allImageUrl.length !== 0) {
            this.imageUrlService.getOneImageFrom(BUCKET_NAME, product.allImageUrl[0].url).subscribe(value => {
                image = value;
            });
        }
        return image;
    }
}
