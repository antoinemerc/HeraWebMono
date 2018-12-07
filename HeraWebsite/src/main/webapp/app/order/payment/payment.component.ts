import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'jhi-payment',
    templateUrl: './payment.component.html',
    styleUrls: ['payment.scss']
})
export class PaymentComponent implements OnInit {
    @Input() order;

    constructor() {}

    ngOnInit() {}
}
