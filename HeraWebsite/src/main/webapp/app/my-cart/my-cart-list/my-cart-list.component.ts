import { Component, OnInit, Input, AfterViewChecked, Output, EventEmitter } from '@angular/core';
import { IProduct } from 'app/shared/model/product.model';
import { Order } from 'app/shared/model/order.model';
import { Principal, IUser, Account, UserService } from 'app/core';
import { HttpResponse } from '@angular/common/http';
import { OrderSharedService } from 'app/shared/service/order-shared.service';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { IBasketItem } from '../../shared/model/basket_item.model';
import { CartCountService } from '../../shared/service/cart-count.service';

@Component({
    selector: 'jhi-my-cart-list',
    templateUrl: './my-cart-list.component.html',
    styleUrls: ['my-cart-list.component.scss']
})
export class MyCartListComponent implements OnInit, AfterViewChecked {
    @Input() cartProducts: IProduct[];
    @Input() basket: IBasketItem[];
    @Output() basketChange = new EventEmitter<IBasketItem[]>();
    @Output() productChange = new EventEmitter<IProduct[]>();

    modifiedItem: boolean[] = [];
    quantities: number[] = [];
    accountConnected: Account;
    currentUser: IUser;
    totalCost = 0;
    stockErrors = false;

    constructor(
        public principal: Principal,
        private router: Router,
        private orderSharedService: OrderSharedService,
        private userService: UserService,
        private cdRef: ChangeDetectorRef,
        private cartCountService: CartCountService
    ) {}

    ngAfterViewChecked() {
        this.cdRef.detectChanges();
    }

    ngOnInit() {
        for (let i = 0; i < this.basket.length; i++) {
            this.modifiedItem.push(false);
            this.quantities.push(this.basket[i].quantity);
        }
        if (this.principal.isAuthenticated()) {
            this.principal.identity().then(account => {
                this.accountConnected = account;
                this.userService.find(this.accountConnected.login).subscribe((res: HttpResponse<IUser>) => {
                    this.currentUser = res.body;
                });
            });
            this.getTotalCost();
        }
    }

    removeFromBasket(idx: number) {
        this.cartCountService.update(-this.basket[idx].quantity);
        this.quantities.splice(idx, 1);
        this.modifiedItem.splice(idx, 1);
        this.basket.splice(idx, 1);
        this.cartProducts.splice(idx, 1);
        this.userService.updateCartAfterRemove(this.basket).subscribe();
        this.verifyAllStock();
        this.getTotalCost();
        this.basketChange.emit(this.basket);
        this.productChange.emit(this.cartProducts);
    }

    getInfoProduct(_id: String) {
        let product;
        for (const p of this.cartProducts) {
            if (p.id === _id) {
                product = p;
                break;
            }
        }
        return product;
    }

    pay() {
        const order = new Order();
        order.user = this.currentUser;
        order.orderLine = this.basket;
        order.state = 'Transit';
        order.date = this.createDate();
        order.totalPrice = this.totalCost;
        this.orderSharedService.save(order);
        this.router.navigate(['/orderProcess']);
    }

    getTotalCost() {
        let total = 0;
        if (this.basket != null) {
            for (const entry of this.basket) {
                total += entry.quantity * this.getInfoProduct(entry.prod).price;
            }
        }
        this.totalCost = total;
    }

    buttonUpdate(idx: number) {
        this.modifiedItem[idx] = false;
        this.basket[idx].quantity = this.quantities[idx] - this.basket[idx].quantity;
        this.cartCountService.update(this.basket[idx].quantity);
        this.userService.updateBasket(this.basket[idx]).subscribe();
        this.basket[idx].quantity = this.quantities[idx];
        this.verifyAllStock();
        this.getTotalCost();
    }

    verifyAllStock() {
        let cartValid = true;
        for (let i = 0; i < this.basket.length; i++) {
            cartValid = cartValid || this.verifyStock(this.basket[i]);
        }
        this.stockErrors = !cartValid;
    }

    updateQuantity(idx: number) {
        this.modifiedItem[idx] = true;
    }

    preventKeyboard(e) {
        e.preventDefault();
    }

    verifyStock(_item) {
        /*if ( _item.prod === '5bee87cbca2ab4315cc26237' ) {
            _item.quantity = 100000;
        }*/
        const prod = this.getInfoProduct(_item.prod);
        if (_item.quantity <= prod.quantity) {
            return true;
        } else {
            this.stockErrors = true;
            return false;
        }
    }

    createDate() {
        const today = new Date();
        const dd = today.getDate();
        const mm = today.getMonth() + 1;
        const yyyy = today.getFullYear();
        return dd + '/' + mm + '/' + yyyy;
    }
}
