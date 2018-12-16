import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SidebarService {
    status = false;

    public constructor() {}

    public getStatus(): boolean {
        return this.status;
    }

    public swapStatus(): boolean {
        if (this.status) {
            this.status = false;
        } else {
            this.status = true;
        }
        return this.status;
    }
}
