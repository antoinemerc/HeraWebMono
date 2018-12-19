import { Routes } from '@angular/router';

import { ProductPageComponent } from './product-page.component';

export const PRODUCT_PAGE_ROUTE: Routes = [
    {
        path: 'displayProduct/:id',
        component: ProductPageComponent,
        data: {
            breadcrumbs: 'Product',
            authorities: [],
            pageTitle: 'page-title.product'
        }
    }
];
