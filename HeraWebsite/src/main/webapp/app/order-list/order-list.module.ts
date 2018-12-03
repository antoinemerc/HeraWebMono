import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderListComponent } from './order-list.component';
import { RouterModule } from '@angular/router';
import { ORDER_LIST_ROUTE } from './order-list.route';
import { OrderItemComponent } from './order-item/order-item.component';

@NgModule({
    imports: [CommonModule, RouterModule.forChild(ORDER_LIST_ROUTE)],
    declarations: [OrderListComponent, OrderItemComponent],
    exports: [OrderListComponent, OrderItemComponent]
})
export class OrderListModule {}
