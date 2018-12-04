import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IProduct } from '../shared/model/product.model';
import { IBasketItem, BasketItem } from '../shared/model/basket_item.model';
import { HttpResponse } from '@angular/common/http';
import { LoginModalService, Principal, UserService, IUser, Account } from 'app/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from 'app/shared/service/product.service';
import { SafeResourceUrl } from '@angular/platform-browser';
import { ImageUrlService } from 'app/shared/service/imageUrl.service';

import { BUCKET_NAME } from 'app/app.constants';
import { CartCountService } from '../shared/service/cart-count.service';

@Component({
    selector: 'jhi-product-page',
    templateUrl: './product-page.component.html',
    styleUrls: ['product-page.scss']
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
    mainImage: SafeResourceUrl = 'content/images/placeHolder.png';

    constructor(
        private route: ActivatedRoute,
        private loginModalService: LoginModalService,
        private router: Router,
        private productService: ProductService,
        private imageUrlService: ImageUrlService,
        private principal: Principal,
        private userService: UserService,
        private cartCountService: CartCountService
    ) {}

    ngOnInit() {
        this.finished = false;
        this.basketConfirmed = 0;
        this.route.params.subscribe((params: Params) => (this.id = params['id']));
        this.productService
            .find(this.id)
            .toPromise()
            .then((res: HttpResponse<IProduct>) => this.bindBody(res.body));
        this.connectUser();
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    productAvailable() {
        return this.product.quantity > 0;
    }

    /**
     * Action to perform when click on the button to add in basket. (Save the product)
     */
    click() {
        this.basketConfirmed = 1;
        if (this.principal.isAuthenticated()) {
            this.userService.updateBasket(this.newItem).subscribe(response => {
                if (response.status === 200) {
                    this.cartCountService.update(this.newItem.quantity);
                    this.basketConfirmed = 2;
                } else {
                    this.basketConfirmed = -1;
                }
            });
        }
    }

    /**
     * Return true if the connected user has the current product in his basket.
     * Else return false
     */
    isItemInBasket() {
        let retour: boolean;
        retour = false;
        if (this.principal.isAuthenticated() && this.currentUser !== undefined) {
            for (const item of this.currentUser.basket) {
                if (item.prod === this.product.id) {
                    retour = true;
                }
            }
        } else {
            retour = false;
        }
        return retour;
    }
    /**
     * Open the modal window for connection
     */
    login() {
        this.modalRef = this.loginModalService.open();
        this.modalRef.result.then(
            data => {
                this.connectUser();
            },
            reason => {
                this.connectUser();
            }
        );
    }

    connectUser() {
        if (this.principal.isAuthenticated()) {
            this.principal.identity().then(account => {
                this.accountConnected = account;
                this.userService.find(this.accountConnected.login).subscribe((res: HttpResponse<IUser>) => {
                    this.currentUser = res.body;
                });
            });
        }
    }

    /**
     * Return true if the quantity given by the user is within the stock range.
     */
    quantityValid() {
        return this.newItem.quantity > 0 && this.newItem.quantity <= this.product.quantity;
    }

    /**
     * @param data The body get from the HTTP
     *
     * Bind the data get from an HTTP query to the variable product
     */
    private bindBody(data: IProduct) {
        this.product = data;
        this.newItem = new BasketItem(this.id, 1);
        this.finished = true;

        if (this.product.allImageUrl.length !== 0) {
            this.imageUrlService.getOneImageFrom(BUCKET_NAME, this.product.allImageUrl[0].url).subscribe(value => {
                this.bindUrl(value);
            });
        }
    }

    private bindUrl(data: SafeResourceUrl) {
        this.mainImage = data;
    }
}
