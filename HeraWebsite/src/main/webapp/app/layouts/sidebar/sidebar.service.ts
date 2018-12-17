import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SidebarService {
    status: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    selectedCategory: BehaviorSubject<string> = new BehaviorSubject<string>('');

    public constructor() {}

    public getSidebarStatus(): Observable<boolean> {
        return this.status;
    }

    public setSidebarStatus(status: boolean): void {
        this.status.next(status);
    }

    public getSelectedCategory(): Observable<string> {
        return this.selectedCategory;
    }

    public setSelectedCategory(selectedCategory: string): void {
        this.selectedCategory.next(selectedCategory);
    }
}
