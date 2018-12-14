import { Routes } from '@angular/router';
import { AddressPageComponent } from './address-page/address-page.component';
import { TransportManagementComponent } from './transport-management/transport-management.component';
import { ValidationPageComponent } from './validation-page/validation-page.component';
import { OrderComponent } from './order.component';
import { UserRouteAccessService } from 'app/core';
import { PaymentMethodsComponent } from 'app/order/payment-methods/payment-methods.component';

export const ORDER_ROUTE: Routes = [
    {
        path: 'orderProcess',
        component: OrderComponent,
        canActivateChild: [UserRouteAccessService]
    },
    {
        path: 'addressChoice',
        component: AddressPageComponent,
        canActivateChild: [UserRouteAccessService]
    },
    {
        path: 'transportManagement',
        component: TransportManagementComponent,
        canActivateChild: [UserRouteAccessService]
    },
    {
        path: 'paymentMethod',
        component: PaymentMethodsComponent,
        canActivateChild: [UserRouteAccessService]
    },
    {
        path: 'validation',
        component: ValidationPageComponent,
        canActivateChild: [UserRouteAccessService]
    }
];
