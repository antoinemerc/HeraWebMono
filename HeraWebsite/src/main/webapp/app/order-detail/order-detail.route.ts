import { Route, Routes } from '@angular/router';

import { OrderDetailComponent } from './order-detail.component';

export const ORDER_DETAIL_ROUTE: Route = {
    path: 'detailedOrder/:id',
    component: OrderDetailComponent,
    data: {}
};
