import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'jhi-address-modal',
    templateUrl: './add-address-popup.component.html',
    styleUrls: ['add-address-popup.component.scss']
})
export class AddressModalComponent {
    constructor(public activeModal: NgbActiveModal) {}

    cancel() {
        this.activeModal.dismiss('cancel');
    }

    cancelNextStep() {
        this.activeModal.dismiss('cancelNextStep');
    }

    confirm() {
        this.activeModal.close('confirm');
    }
}
