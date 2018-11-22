import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { HeraShopCategoryModule } from './category/category.module';
import { HeraShopProductModule } from './product/product.module';
import { HeraShopTransportationMethodModule } from './transportation-method/transportation-method.module';
import { HeraShopOrderModule } from './order/order.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        HeraShopCategoryModule,
        HeraShopProductModule,
        HeraShopTransportationMethodModule,
        HeraShopOrderModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HeraShopEntityModule {}
