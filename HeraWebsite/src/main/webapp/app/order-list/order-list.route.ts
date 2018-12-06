import { Route, Routes } from '@angular/router';

import { OrderListComponent } from './order-list.component';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';

export const ORDER_LIST_ROUTE: Routes = [
    {
        path: 'orders',
        component: OrderListComponent,
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
