import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITransportationMethod } from 'app/shared/model/transportation-method.model';
import { TransportationMethodService } from './transportation-method.service';

@Component({
    selector: 'jhi-transportation-method-delete-dialog',
    templateUrl: './transportation-method-delete-dialog.component.html'
})
export class TransportationMethodDeleteDialogComponent {
    transportationMethod: ITransportationMethod;

    constructor(
        private transportationMethodService: TransportationMethodService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.transportationMethodService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'transportationMethodListModification',
                content: 'Deleted an transportationMethod'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-transportation-method-delete-popup',
    template: ''
})
export class TransportationMethodDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ transportationMethod }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(TransportationMethodDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.transportationMethod = transportationMethod;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
