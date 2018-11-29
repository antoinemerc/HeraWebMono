import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TransportationMethodService } from '../entities/transportation-method/transportation-method.service';
import { ITransportationMethod } from 'app/shared/model/transportation-method.model';
import { HttpResponse } from '@angular/common/http';
import { Principal } from 'app/core';
import { Location } from '@angular/common';
import { IOrder } from 'app/shared/model/order.model';
import { OrderSharedService } from '../shared/service/order-shared.service';

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
        private location: Location,
        private route: ActivatedRoute,
        private orderService: OrderSharedService
    ) {}

    ngOnInit() {
        if (!this.principal.isAuthenticated()) {
            this.location.replaceState('/');
            this.router.navigate(['/']);
        } else {
            this.order = this.orderService.retrieve();
            this.idx = 0;
            this.transportService.query().subscribe((res: HttpResponse<ITransportationMethod[]>) => this.bindBody(res.body));
        }
    }

    nextStep() {
        this.order.transportationMethod = this.transportMethods[this.idx];
        this.orderService.save(this.order);
        this.router.navigate(['/addressChoice']);
    }

    onTransportSelectionChange(entry): void {
        this.idx = entry;
    }

    private bindBody(data: ITransportationMethod[]) {
        this.transportMethods = data;
    }
}
