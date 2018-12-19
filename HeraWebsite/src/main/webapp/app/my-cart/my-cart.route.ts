import { Routes } from '@angular/router';
import { MyCartComponent } from './my-cart.component';

export const MY_CART_ROUTE: Routes = [
    {
        path: 'my-cart',
        component: MyCartComponent,
        data: {
            authorities: [],
            pageTitle: 'page-title.cart'
        }
    }
];
