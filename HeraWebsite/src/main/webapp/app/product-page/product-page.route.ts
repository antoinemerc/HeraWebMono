import { Route } from '@angular/router';

import { ProductPageComponent } from './product-page.component';

export const PRODUCT_PAGE_ROUTE: Route = {
    path: 'displayProduct/:id',
    component: ProductPageComponent
};
