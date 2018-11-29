import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ITransportationMethod } from 'app/shared/model/transportation-method.model';
import { HttpResponse } from '@angular/common/http';
import { Principal } from 'app/core';
import { Location } from '@angular/common';
import { IOrder } from 'app/shared/model/order.model';
import { TransportationMethodService } from 'app/entities/transportation-method';
import { OrderSharedService } from 'app/shared/service/order-shared.service';

@Component({
    selector: 'jhi-transport-management',
    templateUrl: './transport-management.component.html',
    styles: []
})
export class TransportManagementComponent implements OnInit, OnChanges {
    @Input() order: IOrder;
    transportMethods: ITransportationMethod[];
    idx: number;

    constructor(
        private principal: Principal,
        private transportService: TransportationMethodService,
        private router: Router,
        private location: Location,
        private orderSharedService: OrderSharedService
    ) {}

    ngOnInit() {
        if (!this.principal.isAuthenticated()) {
            this.location.replaceState('/');
            this.router.navigate(['/']);
        } else {
            this.idx = 0;
            this.order = this.orderSharedService.retrieve();
            this.transportService.query().subscribe((res: HttpResponse<ITransportationMethod[]>) => this.bindBody(res.body));
        }
    }

    ngOnChanges(changes: SimpleChanges): void {}

    save() {
        this.order.transportationMethod = this.transportMethods[this.idx];
    }

    onTransportSelectionChange(entry): void {
        this.idx = entry;
    }

    private bindBody(data: ITransportationMethod[]) {
        this.transportMethods = data;
    }
}
