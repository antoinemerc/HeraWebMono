import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IOrder } from 'app/shared/model/order.model.ts';
import { OrderService } from '../entities/order/order.service';
import { LoginModalService, Principal } from 'app/core';
import { IOrderAndProducts } from '../shared/model/order_and_products.model';

@Component({
    selector: 'jhi-order-list',
    templateUrl: './order-list.component.html',
    styles: []
})
export class OrderListComponent implements OnInit {
    orders: IOrderAndProducts[];

    constructor(
        private route: ActivatedRoute,
        private orderService: OrderService,
        private principal: Principal,
        private loginService: LoginModalService
    ) {}

    ngOnInit() {
        this.retrieveOrders();
        // wait on an authentification and only then retrieve his information
        this.principal.getAuthenticationState().subscribe((userIdentity: Account) => {
            this.retrieveOrders();
        });
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    logIn() {
        this.loginService.open();
    }

    hasOrders() {
        return this.orders === undefined || this.orders.length > 0;
    }

    retrieveOrders() {
        if (this.isAuthenticated()) {
            this.principal.identity().then((userIdentity: Account) => {
                this.orderService.findByUser(userIdentity.id).subscribe((res: any) => (this.orders = res.body));
            });
        }
    }
}
