import { Component, OnInit, ViewChild } from '@angular/core';
import { TransportManagementComponent } from './transport-management/transport-management.component';
import { AddressPageComponent } from './address-page/address-page.component';
import { ValidationPageComponent } from './validation-page/validation-page.component';
import { IOrder } from 'app/shared/model/order.model';
import { OrderSharedService } from 'app/shared/service/order-shared.service';
import { PaymentMethodsComponent } from 'app/order/payment-methods/payment-methods.component';

@Component({
    selector: 'jhi-order',
    templateUrl: './order.component.html',
    styleUrls: ['order.component.scss']
})
export class OrderComponent implements OnInit {
    order: IOrder;

    @ViewChild(TransportManagementComponent) private transportComponent: TransportManagementComponent;

    @ViewChild(AddressPageComponent) private adressComponent: AddressPageComponent;

    @ViewChild(ValidationPageComponent) private validationComponent: ValidationPageComponent;
    @ViewChild(PaymentMethodsComponent) private paymentComponent: PaymentMethodsComponent;

    step = 1;

    constructor(private orderSharedService: OrderSharedService) {}

    ngOnInit() {
        this.order = this.orderSharedService.retrieve();
    }

    previousStep(): void {
        if (this.step === 2) {
            this.order.transportationMethod = null;
            this.step--;
        } else if (this.step === 3) {
            this.order.address = null;
            this.step--;
        } else if (this.step === 4) {
            this.order.paymentMethod = null;
            this.step--;
        }
    }

    addressValid() {
        let retour = true;
        if (this.adressComponent !== undefined) {
            if (this.step === 2) {
                retour = this.adressComponent.newAddressValid();
            }
        }
        return retour;
    }

    nextStep(): void {
        if (this.step === 1) {
            this.transportComponent.save();
            this.order = this.transportComponent.order;
            this.step++;
        } else if (this.step === 2) {
            const ret = this.adressComponent.save();
            if (ret === null) {
                this.order = this.adressComponent.order;
                this.step++;
            } else {
                ret.result.then(
                    data => {
                        this.order = this.adressComponent.order;
                        this.step++;
                    },
                    reason => {
                        if (reason !== 'cancelNextStep') {
                            this.order = this.adressComponent.order;
                            this.step++;
                        }
                    }
                );
            }
        } else if (this.step === 3) {
            if (this.paymentComponent.save() == false) alert('You need to validate Correct Information');
            else {
                this.paymentComponent.save();
                this.step++;
            }
        }
    }
}
