import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HeraShopSharedModule } from 'app/shared';
import { HOME_ROUTE, HomeComponent } from './';
import { ProductListComponent } from './../component/product-list/product-list.component';

@NgModule({
    imports: [HeraShopSharedModule, RouterModule.forChild([HOME_ROUTE])],
    declarations: [HomeComponent, ProductListComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HeraShopHomeModule {}
