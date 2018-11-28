import { Injectable } from '@angular/core';
import { IOrder } from '../model/order.model';

@Injectable({
    providedIn: 'root'
})
export class OrderSharedService {
    order: IOrder;

    constructor() {}

    save(order: IOrder) {
        this.order = order;
    }

    retrieve() {
        return this.order;
    }
}
