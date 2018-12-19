import { Route, Routes } from '@angular/router';
import { HomeComponent } from './';

export const ALL_HOME_ROUTE: Routes = [
    {
        path: '',
        component: HomeComponent,
        data: {
            authorities: [],
            pageTitle: 'page-title.home',
            breadcrumbs: 'Home'
        }
    }
];
