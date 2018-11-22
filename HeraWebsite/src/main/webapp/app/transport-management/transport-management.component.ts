import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { TransportationMethodService } from '../entities/transportation-method/transportation-method.service';
import { ITransportationMethod } from 'app/shared/model/transportation-method.model';
import { HttpResponse } from '@angular/common/http';
import { Principal } from 'app/core';
import { Location } from '@angular/common';
import { IOrder } from 'app/shared/model/order.model';

@Component({
    selector: 'jhi-transport-management',
    templateUrl: './transport-management.component.html',
    styles: []
})
export class TransportManagementComponent implements OnInit {
    transportMethods: ITransportationMethod[];
    order: IOrder;
    idx: number;

    constructor(
        private principal: Principal,
        private transportService: TransportationMethodService,
        private router: Router,
        private location: Location
    ) {}

    ngOnInit() {
        if (!this.principal.isAuthenticated()) {
            this.location.replaceState('/');
            this.router.navigate(['/']);
        } else {
            this.idx = 0;
            this.transportService.query().subscribe((res: HttpResponse<ITransportationMethod[]>) => this.bindBody(res.body));
        }
    }

    display() {
        // this.order.transportationMethod = this.transportMethods[this.idx];
        console.log(this.transportMethods[this.idx]);
    }

    onTransportSelectionChange(entry): void {
        this.idx = entry;
    }

    private bindBody(data: ITransportationMethod[]) {
        this.transportMethods = data;
    }
}
