import { Routes } from '@angular/router';

import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';

import { OrderPageComponent } from './order-page.component';

export const ORDER_PAGE_ROUTE: Routes = [
    {
        path: 'orders',
        component: OrderPageComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'heraShopApp.order.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];
