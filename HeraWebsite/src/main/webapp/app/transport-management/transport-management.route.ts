import { Route, Routes } from '@angular/router';

import { TransportManagementComponent } from './transport-management.component';

export const TRANSPORT_MANAGEMENT_ROUTE: Routes = [
    {
        path: 'transportManagement',
        component: TransportManagementComponent
    }
];
