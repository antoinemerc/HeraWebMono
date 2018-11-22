import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { TransportationMethod } from 'app/shared/model/transportation-method.model';
import { TransportationMethodService } from './transportation-method.service';
import { TransportationMethodComponent } from './transportation-method.component';
import { TransportationMethodDetailComponent } from './transportation-method-detail.component';
import { TransportationMethodUpdateComponent } from './transportation-method-update.component';
import { TransportationMethodDeletePopupComponent } from './transportation-method-delete-dialog.component';
import { ITransportationMethod } from 'app/shared/model/transportation-method.model';

@Injectable({ providedIn: 'root' })
export class TransportationMethodResolve implements Resolve<ITransportationMethod> {
    constructor(private service: TransportationMethodService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((transportationMethod: HttpResponse<TransportationMethod>) => transportationMethod.body));
        }
        return of(new TransportationMethod());
    }
}

export const transportationMethodRoute: Routes = [
    {
        path: 'transportation-method',
        component: TransportationMethodComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'heraShopApp.transportationMethod.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'transportation-method/:id/view',
        component: TransportationMethodDetailComponent,
        resolve: {
            transportationMethod: TransportationMethodResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'heraShopApp.transportationMethod.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'transportation-method/new',
        component: TransportationMethodUpdateComponent,
        resolve: {
            transportationMethod: TransportationMethodResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'heraShopApp.transportationMethod.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'transportation-method/:id/edit',
        component: TransportationMethodUpdateComponent,
        resolve: {
            transportationMethod: TransportationMethodResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'heraShopApp.transportationMethod.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const transportationMethodPopupRoute: Routes = [
    {
        path: 'transportation-method/:id/delete',
        component: TransportationMethodDeletePopupComponent,
        resolve: {
            transportationMethod: TransportationMethodResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'heraShopApp.transportationMethod.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
