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
import { OrderSharedService } from 'app/shared/service/order-shared.service';
import { OrderService } from 'app/entities/order';
import { ProductService } from 'app/shared';
import { UserService } from '../../core/user/user.service';
import { IBasketItem } from '../../shared/model/basket_item.model';

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
        private orderService: OrderService,
        private productService: ProductService,
        private imageUrlService: ImageUrlService,
        private userService: UserService
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
        this.productService.queryUpdateOrder(this.order.orderLine).subscribe(
            data => {
                this.orderService.create(this.order).subscribe((res: HttpResponse<IProduct>) => console.log('Order created'));
                const emptyBasket: IBasketItem[] = [];
                this.userService.updateCartAfterRemove(emptyBasket).subscribe();
            },
            err => console.log('Error')
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
