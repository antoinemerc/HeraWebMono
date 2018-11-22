import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ITransportationMethod } from 'app/shared/model/transportation-method.model';
import { TransportationMethodService } from './transportation-method.service';

@Component({
    selector: 'jhi-transportation-method-update',
    templateUrl: './transportation-method-update.component.html'
})
export class TransportationMethodUpdateComponent implements OnInit {
    private _transportationMethod: ITransportationMethod;
    isSaving: boolean;

    constructor(private transportationMethodService: TransportationMethodService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ transportationMethod }) => {
            this.transportationMethod = transportationMethod;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.transportationMethod.id !== undefined) {
            this.subscribeToSaveResponse(this.transportationMethodService.update(this.transportationMethod));
        } else {
            this.subscribeToSaveResponse(this.transportationMethodService.create(this.transportationMethod));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ITransportationMethod>>) {
        result.subscribe(
            (res: HttpResponse<ITransportationMethod>) => this.onSaveSuccess(),
            (res: HttpErrorResponse) => this.onSaveError()
        );
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get transportationMethod() {
        return this._transportationMethod;
    }

    set transportationMethod(transportationMethod: ITransportationMethod) {
        this._transportationMethod = transportationMethod;
    }
}
