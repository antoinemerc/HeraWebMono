import { Injectable } from '@angular/core';
import { JhiEventManager } from 'ng-jhipster';
import { HttpResponse } from '@angular/common/http';
import { UserService, Principal, IUser } from 'app/core';

@Injectable({
    providedIn: 'root'
})
export class CartCountService {
    numberItems: number;

    constructor(private userService: UserService, public principal: Principal, private eventManager: JhiEventManager) {}

    reset() {
        this.numberItems = 0;
        this.notify();
    }

    initWithCart() {
        this.principal.identity().then(account => {
            const accountConnected = account;
            this.userService.find(accountConnected.login).subscribe((res: HttpResponse<IUser>) => {
                const currentUser = res.body;
                let counter = 0;
                for (const item of currentUser.basket) {
                    counter += item.quantity;
                }
                this.numberItems = counter;
                this.notify();
            });
        });
    }

    update(value: number) {
        this.numberItems += value;
        this.notify();
    }

    notify() {
        this.eventManager.broadcast({
            name: 'cartCountChange',
            content: this.numberItems
        });
    }
}
