import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeraShopSharedModule } from 'app/shared';
import { ALL_HOME_ROUTE, HomeComponent } from './';
import { ProductListModule } from 'app/product-list/product-list.module';
import { AddressPageModule } from 'app/address-page/address-page.module';

@NgModule({
    imports: [HeraShopSharedModule, RouterModule.forChild(ALL_HOME_ROUTE), ProductListModule, AddressPageModule],
    declarations: [HomeComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HeraShopHomeModule {}
