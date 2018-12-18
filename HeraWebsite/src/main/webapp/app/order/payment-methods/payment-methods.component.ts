import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Principal } from 'app/core';
import { Location } from '@angular/common';
import { IOrder } from 'app/shared/model/order.model';
import { SafeResourceUrl } from '@angular/platform-browser';
import { Card } from 'app/order/payment-methods/card';

@Component({
    selector: 'jhi-payment-methods',
    templateUrl: './payment-methods.component.html',
    styleUrls: ['payment-methods.component.scss']
})
export class PaymentMethodsComponent implements OnInit, OnChanges {
    @Input() order: IOrder;
    mainImage: SafeResourceUrl = 'content/images/visa.png';
    mainImage1: SafeResourceUrl = 'content/images/master.jpg';
    mainImage2: SafeResourceUrl = 'content/images/american.png';
    mainImage3: SafeResourceUrl = 'content/images/paypal.jpg';
    mainImage4: SafeResourceUrl = 'content/images/money.png';
    public selectedLink = 'Pay the transporter';
    public show = false;
    public card = new Card(null, null);

    constructor(private principal: Principal, private router: Router, private location: Location) {}

    ngOnInit() {
        if (!this.principal.isAuthenticated()) {
            this.location.replaceState('/');
            this.router.navigate(['/']);
        }
    }
    onFormSubmit({ value, valid }: { value: Card; valid: boolean }) {
        this.card = value;
        console.log(this.card);
        console.log('valid: ' + valid);
    }

    ngOnChanges(changes: SimpleChanges): void {}

    public setradio(e: string): void {
        this.selectedLink = e;
    }

    public save(): boolean {
        if (this.selectedLink === 'Credit card') {
            if (this.card.numberCard == null || this.card.cvv == null) {
                return false;
            }
        } else {
            this.order.paymentMethod = this.selectedLink;
            return true;
        }
    }
    toggle(a: boolean) {
        this.show = a;
    }
}
