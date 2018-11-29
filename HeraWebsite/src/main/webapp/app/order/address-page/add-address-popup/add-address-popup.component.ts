import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'jhi-address-modal',
    templateUrl: './add-address-popup.component.html'
})
export class AddressModalComponent {
    constructor(public activeModal: NgbActiveModal) {}

    cancel() {
        this.activeModal.dismiss('cancel');
    }

    confirm() {
        this.activeModal.close('confirm');
    }
}
