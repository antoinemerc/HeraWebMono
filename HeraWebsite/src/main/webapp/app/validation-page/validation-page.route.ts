import { Route, Routes } from '@angular/router';

import { ValidationPageComponent } from './validation-page.component';

export const VALIDATION_PAGE_ROUTE: Routes = [
    {
        path: 'validation',
        component: ValidationPageComponent
    }
];
