import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { ICriteria, Criteria } from 'app/shared/model/searchCriteria';

@Injectable({
    providedIn: 'root'
})
export class SidebarService {
    status: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    onProductListSearch: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    searchCriteria: BehaviorSubject<ICriteria[]> = new BehaviorSubject<ICriteria[]>([]);

    public constructor() {}

    public getSidebarStatus(): Observable<boolean> {
        return this.status;
    }

    public setSidebarStatus(status: boolean): void {
        this.status.next(status);
    }
}
