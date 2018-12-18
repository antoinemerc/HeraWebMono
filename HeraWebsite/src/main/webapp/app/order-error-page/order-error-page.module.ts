import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderErrorPageComponent } from './order-error-page.component';
import { ORDER_ERROR_PAGE_ROUTE } from './order-error-page.route';

@NgModule({
    imports: [CommonModule, RouterModule.forRoot(ORDER_ERROR_PAGE_ROUTE, { useHash: true }), FormsModule],
    declarations: [OrderErrorPageComponent],
    entryComponents: [],
    providers: []
})
export class OrderErrorPageModule {}
