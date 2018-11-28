import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { IOrder } from '../shared/model/order.model';
import { HttpResponse } from '@angular/common/http';
import { Principal, IUser, UserService, Account } from 'app/core';
import { Location } from '@angular/common';
import { IAddress, Address } from '../shared/model/address.model';
import { AddressModalService } from './add-address-popup/address-modal.service';
import { OrderSharedService } from '../shared/service/order-shared.service';

@Component({
    selector: 'jhi-address-page',
    templateUrl: './address-page.component.html',
    styles: []
})
export class AddressPageComponent implements OnInit {
    order: IOrder;
    user: IUser;
    accountConnected: Account;
    newAddress: IAddress;
    idxAddress: number;

    constructor(
        private principal: Principal,
        private userService: UserService,
        private router: Router,
        private location: Location,
        private addressModalService: AddressModalService,
        private orderService: OrderSharedService
    ) {}

    ngOnInit() {
        if (!this.principal.isAuthenticated()) {
            this.location.replaceState('/');
            this.router.navigate(['/']);
        } else {
            this.newAddress = new Address();
            this.idxAddress = 1;
            this.order = this.orderService.retrieve();
            this.user = this.order.user;
        }
    }

    next() {
        let orderAddress;
        if (this.idxAddress === 0) {
            orderAddress = this.newAddress;
            const ret = this.addressModalService.open();
            ret.result.then(
                data => {
                    this.user.allAddress.push(orderAddress);
                    this.userService.update(this.user).subscribe();
                    this.order.address = orderAddress;
                    this.router.navigate(['/validation']);
                },
                reason => {
                    this.order.address = orderAddress;
                    this.router.navigate(['/validation']);
                }
            );
        } else {
            orderAddress = this.user.allAddress[this.idxAddress - 1];
            this.order.address = orderAddress;
            this.router.navigate(['/validation']);
        }
    }

    onAddressSelectionChange(entry): void {
        this.idxAddress = entry;
    }
}
