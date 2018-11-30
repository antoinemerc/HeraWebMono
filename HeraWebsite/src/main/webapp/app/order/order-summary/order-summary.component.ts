import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { IOrder } from 'app/shared/model/order.model';

@Component({
    selector: 'jhi-order-summary',
    templateUrl: './order-summary.component.html',
    styleUrls: ['order-summary.component.scss']
})
export class OrderSummaryComponent implements OnInit, OnChanges {
    @Input() order: IOrder;

    constructor() {}

    ngOnInit(): void {}

    ngOnChanges(changes: SimpleChanges): void {}
}
