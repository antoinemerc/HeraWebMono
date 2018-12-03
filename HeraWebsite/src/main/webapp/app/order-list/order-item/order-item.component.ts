import { Component, OnInit, Input } from '@angular/core';
import { IOrder } from 'app/shared/model/order.model';

@Component({
    selector: 'jhi-order-item',
    templateUrl: './order-item.component.html',
    styles: []
})
export class OrderItemComponent implements OnInit {
    @Input() order: IOrder;
    constructor() {}

    ngOnInit() {}
}
