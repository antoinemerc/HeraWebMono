import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderComponent } from './order.component';
import { RouterModule } from '@angular/router';
import { ORDER_ROUTE } from './order.route';
import { AddressPageComponent } from './address-page/address-page.component';
import { AddressModalComponent } from './address-page/add-address-popup/add-address-popup.component';
import { TransportManagementComponent } from './transport-management/transport-management.component';
import { ValidationPageComponent } from './validation-page/validation-page.component';
import { UserRouteAccessService } from 'app/core';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { PaymentComponent } from './payment/payment.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PaymentMethodsComponent } from 'app/order/payment-methods/payment-methods.component';

@NgModule({
    imports: [CommonModule, RouterModule.forChild(ORDER_ROUTE), FormsModule, MatProgressSpinnerModule],
    declarations: [
        OrderComponent,
        AddressPageComponent,
        AddressModalComponent,
        TransportManagementComponent,
        ValidationPageComponent,
        PaymentMethodsComponent,
        OrderSummaryComponent,
        PaymentComponent
    ],
    entryComponents: [AddressModalComponent],
    providers: [UserRouteAccessService]
})
export class OrderModule {}
