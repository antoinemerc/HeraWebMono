import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProductPageComponent } from './product-page.component';
import { PRODUCT_PAGE_ROUTE } from './product-page.route';

@NgModule({
    imports: [CommonModule, RouterModule.forRoot([PRODUCT_PAGE_ROUTE], { useHash: true }), FormsModule],
    declarations: [ProductPageComponent],
    entryComponents: [],
    providers: []
})
export class ProductPageModule {}
