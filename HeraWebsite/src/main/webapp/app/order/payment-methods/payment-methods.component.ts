import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Principal } from 'app/core';
import { Location } from '@angular/common';
import { IOrder } from 'app/shared/model/order.model';

@Component({
    selector: 'jhi-payment-methods',
    templateUrl: './payment-methods.component.html',
    styleUrls: ['payment-methods.component.scss']
})
export class PaymentMethodsComponent implements OnInit, OnChanges {
    @Input() order: IOrder;

    constructor(private principal: Principal, private router: Router, private location: Location) {}

    ngOnInit() {
        if (!this.principal.isAuthenticated()) {
            this.location.replaceState('/');
            this.router.navigate(['/']);
        }
    }

    ngOnChanges(changes: SimpleChanges): void {}

    public selectedLink: string = 'Card VISA';

    public setradio(e: string): void {
        this.selectedLink = e;
    }

    public save() {
        this.order.paymentMethod = this.selectedLink;
    }
}
