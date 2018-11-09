import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProductPageComponent } from './product-page.component';
import { PRODUCT_PAGE_ROUTE } from './product-page.route';

@NgModule({
    imports: [RouterModule.forRoot([PRODUCT_PAGE_ROUTE], { useHash: true })],
    declarations: [ProductPageComponent],
    entryComponents: [],
    providers: []
})
export class ProductPageModule {}
