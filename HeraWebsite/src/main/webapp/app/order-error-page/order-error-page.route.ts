import { Routes } from '@angular/router';

import { OrderErrorPageComponent } from './order-error-page.component';

export const ORDER_ERROR_PAGE_ROUTE: Routes = [
    {
        path: 'order-error',
        component: OrderErrorPageComponent,
        data: {
            authorities: [],
            pageTitle: 'page-title.order-error'
        }
    }
];
