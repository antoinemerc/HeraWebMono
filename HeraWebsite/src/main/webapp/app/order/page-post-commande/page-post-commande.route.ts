import { Routes } from '@angular/router';
import { OrderListComponent } from 'app/order-list/order-list.component';

export const ORDERDETAILS_ROUTE: Routes = [
    {
        path: 'orderDetails',
        component: OrderListComponent
    }
];
