import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HeraShopSharedModule } from 'app/shared';
import {
    TransportationMethodComponent,
    TransportationMethodDetailComponent,
    TransportationMethodUpdateComponent,
    TransportationMethodDeletePopupComponent,
    TransportationMethodDeleteDialogComponent,
    transportationMethodRoute,
    transportationMethodPopupRoute
} from './';

const ENTITY_STATES = [...transportationMethodRoute, ...transportationMethodPopupRoute];

@NgModule({
    imports: [HeraShopSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TransportationMethodComponent,
        TransportationMethodDetailComponent,
        TransportationMethodUpdateComponent,
        TransportationMethodDeleteDialogComponent,
        TransportationMethodDeletePopupComponent
    ],
    entryComponents: [
        TransportationMethodComponent,
        TransportationMethodUpdateComponent,
        TransportationMethodDeleteDialogComponent,
        TransportationMethodDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HeraShopTransportationMethodModule {}
