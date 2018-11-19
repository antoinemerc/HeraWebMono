import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITransportationMethod } from 'app/shared/model/transportation-method.model';

@Component({
    selector: 'jhi-transportation-method-detail',
    templateUrl: './transportation-method-detail.component.html'
})
export class TransportationMethodDetailComponent implements OnInit {
    transportationMethod: ITransportationMethod;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ transportationMethod }) => {
            this.transportationMethod = transportationMethod;
        });
    }

    previousState() {
        window.history.back();
    }
}
