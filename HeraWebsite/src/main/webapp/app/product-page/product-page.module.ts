import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProductPageComponent } from './product-page.component';
import { PRODUCT_PAGE_ROUTE } from './product-page.route';
import { AllCommentComponent } from './all-comment/all-comment.component';
import { PaymentComponent } from './../payment/payment.component';

const routesConfig: Routes = [
    { path: 'displayProduct/:id', component: ProductPageComponent },
    { path: 'payment', component: PaymentComponent }
];

@NgModule({
    imports: [CommonModule, RouterModule.forRoot(routesConfig, { useHash: true }), FormsModule],
    declarations: [ProductPageComponent, AllCommentComponent, PaymentComponent],
    entryComponents: [],
    providers: []
})
export class ProductPageModule {}
