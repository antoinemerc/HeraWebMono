import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TransportationMethodService } from '../entities/transportation-method/transportation-method.service';
import { ITransportationMethod } from 'app/shared/model/transportation-method.model';
import { HttpResponse } from '@angular/common/http';
import { Principal } from 'app/core';
import { Location } from '@angular/common';
import { IOrder } from 'app/shared/model/order.model';
import { OrderService } from '../shared/service/order.service';
import { IProduct } from '../shared/model/product.model';
import { ProductService } from '../shared/service/product.service';

@Component({
    selector: 'jhi-validation-page',
    templateUrl: './validation-page.component.html',
    styles: []
})
export class ValidationPageComponent implements OnInit {
    order: IOrder;
    cartProducts: IProduct[];

    constructor(
        private principal: Principal,
        private router: Router,
        private location: Location,
        private orderService: OrderService,
        private productService: ProductService
    ) {}

    ngOnInit() {
        if (!this.principal.isAuthenticated()) {
            this.location.replaceState('/');
            this.router.navigate(['/']);
        } else {
            this.order = this.orderService.retrieve();
            this.productService.queryBasket(this.order.orderLine).subscribe((cart: HttpResponse<IProduct[]>) => {
                this.cartProducts = cart.body;
            });
        }
    }

    validate() {
        this.productService.queryUpdateOrder(this.order.orderLine).subscribe();
    }
}
