import { Route, Routes } from '@angular/router';

import { ProductPageComponent } from './product-page.component';
import { PaymentComponent } from 'app/payment/payment.component';

export const PRODUCT_PAGE_ROUTE: Route = {
    path: 'displayProduct/:id',
    component: ProductPageComponent,
    data: {
        breadcrumbs: 'Product'
    }
};
