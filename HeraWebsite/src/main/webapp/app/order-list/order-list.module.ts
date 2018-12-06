import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderListComponent } from './order-list.component';
import { RouterModule } from '@angular/router';
import { ORDER_LIST_ROUTE } from './order-list.route';
import { OrderItemComponent } from './order-item/order-item.component';
import { HeraShopSharedModule } from 'app/shared';

@NgModule({
    imports: [HeraShopSharedModule, CommonModule, RouterModule.forChild(ORDER_LIST_ROUTE)],
    declarations: [OrderListComponent, OrderItemComponent],
    exports: [OrderListComponent, OrderItemComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OrderListModule {}
