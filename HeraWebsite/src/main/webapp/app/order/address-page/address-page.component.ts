import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Principal, IUser, UserService, Account } from 'app/core';
import { Location } from '@angular/common';
import { AddressModalService } from './add-address-popup/address-modal.service';
import { IAddress, Address } from 'app/shared/model/address.model';
import { IOrder } from 'app/shared/model/order.model';
import { OrderSharedService } from 'app/shared/service/order-shared.service';

@Component({
    selector: 'jhi-address-page',
    templateUrl: './address-page.component.html',
    styles: []
})
export class AddressPageComponent implements OnInit, OnChanges {
    @Input() order: IOrder;
    user: IUser;
    accountConnected: Account;
    newAddress: IAddress;
    idxAddress: number;
    addNewAddress = false;

    constructor(
        private principal: Principal,
        private userService: UserService,
        private router: Router,
        private location: Location,
        private addressModalService: AddressModalService
    ) {}

    ngOnInit() {
        if (!this.principal.isAuthenticated()) {
            this.location.replaceState('/');
            this.router.navigate(['/']);
        } else {
            this.newAddress = new Address();
            if (this.user.allAddress.length > 0) {
                this.idxAddress = 1;
            } else {
                this.idxAddress = 0;
                this.addNewAddress = true;
            }
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.user = this.order.user;
    }

    save() {
        let orderAddress;
        if (this.idxAddress === 0) {
            orderAddress = this.newAddress;
            const ret = this.addressModalService.open();
            ret.result.then(
                data => {
                    this.user.allAddress.push(orderAddress);
                    this.userService.update(this.user).subscribe();
                    this.order.address = orderAddress;
                },
                reason => {
                    this.order.address = orderAddress;
                }
            );
            return ret;
        } else {
            orderAddress = this.user.allAddress[this.idxAddress - 1];
            this.order.address = orderAddress;
        }
        return null;
    }

    onAddressSelectionChange(entry): void {
        this.idxAddress = entry;
        if (entry === 0) {
            this.addNewAddress = true;
        } else {
            this.addNewAddress = false;
        }
    }
}
