import { Routes } from '@angular/router';
import { PagePostCommandeComponent } from 'app/order/page-post-commande/page-post-commande.component';
import { UserRouteAccessService } from 'app/core';
import { Order } from 'app/shared/model/order.model';

export const PAGEPOSTCOMMANDE_ROUTE: Routes = [
    {
        path: 'pagePostCommande',
        component: PagePostCommandeComponent
    }
];
