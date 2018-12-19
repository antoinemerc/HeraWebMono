import { Route, Routes } from '@angular/router';

import { ProductListComponent } from './product-list.component';

export const ALL_PRODUCT_LIST_ROUTE: Routes = [
    {
        path: 'displayProducts/:displayCriteria',
        component: ProductListComponent
    }
];
