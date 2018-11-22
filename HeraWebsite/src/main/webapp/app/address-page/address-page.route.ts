import { Route, Routes } from '@angular/router';

import { AddressPageComponent } from './address-page.component';

export const ADDRESS_PAGE_ROUTE: Routes = [
    {
        path: 'addressChoice',
        component: AddressPageComponent
    }
];
