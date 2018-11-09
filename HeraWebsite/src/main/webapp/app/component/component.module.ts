import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ProductListModule } from './product-list/product-list.module';

@NgModule({
    imports: [ProductListModule],
    declarations: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HeraShopComponentModule {}
