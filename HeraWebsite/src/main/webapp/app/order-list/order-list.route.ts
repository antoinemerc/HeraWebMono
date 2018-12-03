import { Route, Routes } from '@angular/router';

import { OrderListComponent } from './order-list.component';

export const ORDER_LIST_ROUTE: Routes = [
    {
        path: 'orders',
        component: OrderListComponent,
        data: {}
    }
];
