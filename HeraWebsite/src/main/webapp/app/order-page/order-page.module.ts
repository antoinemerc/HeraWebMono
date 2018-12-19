import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ORDER_PAGE_ROUTE } from './order-page.route';
import { HeraShopSharedModule } from 'app/shared';
import { OrderPageComponent } from './order-page.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
    imports: [HeraShopSharedModule, CommonModule, RouterModule.forChild(ORDER_PAGE_ROUTE), MatProgressSpinnerModule],
    declarations: [OrderPageComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OrderPageModule {}
