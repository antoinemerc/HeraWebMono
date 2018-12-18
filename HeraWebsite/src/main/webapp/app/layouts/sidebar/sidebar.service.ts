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

    public getOnProductListSearch(): Observable<boolean> {
        return this.onProductListSearch;
    }

    public setOnProductListSearch(status: boolean): void {
        this.onProductListSearch.next(status);
    }

    /**
     * Add a criteria
     * @param name the criteria type to add
     * @param value the value of the criteria
     */
    public addCriteria(name: string, value: string | number): void {
        const currentCriteria = this.searchCriteria.getValue();
        currentCriteria.push(new Criteria(name, value));
        this.searchCriteria.next(currentCriteria);
    }

    /**
     * Delete a specific criteria
     * @param name the criteria type to destroy
     * @param value the value to search for
     */
    public deleteCriteria(name: string, value: string | number): void {
        const currentCriteria = this.searchCriteria.getValue();
        for (let i = 0; i < currentCriteria.length; i++) {
            if (currentCriteria[i].name === name && currentCriteria[i].value === value) {
                currentCriteria.splice(i, 1);
            }
        }
        this.searchCriteria.next(currentCriteria);
    }

    /**
     * Delete all criteria of a type
     * @param name the criteria type to destroy
     */
    public deleteAllCriteriaType(name: string): void {
        const currentCriteria = this.searchCriteria.getValue();
        for (let i = 0; i < currentCriteria.length; i++) {
            if (currentCriteria[i].name === name) {
                currentCriteria.splice(i, 1);
            }
        }
        this.searchCriteria.next(currentCriteria);
    }

    /**
     * Delete all criteria
     * @param name the criteria type to destroy
     */
    public deleteAllCriteria(): void {
        this.searchCriteria.next([]);
    }

    public getCriteria(): Observable<Criteria[]> {
        return this.searchCriteria;
    }

    /**
     * Retrieve from an array of criteria a type of criteria
     * !!! NOT BOUND TO OBSERVABLE !!! only for post treatement
     * @param allCriteria the array of criteria
     * @param criteriaName the type of criteria to retrieve
     */
    public getSpecificCriteria(allCriteria: Criteria[], criteriaName: string): Criteria[] {
        const wantedCriteria = [];
        for (let i = 0; i < allCriteria.length; i++) {
            if (allCriteria[i].name === criteriaName) {
                wantedCriteria.push(allCriteria[i]);
            }
        }
        return wantedCriteria;
    }

    /**
     * Check if a criteria exist
     * !!! NOT BOUND TO OBSERVABLE !!! only for post treatement
     * @param allCriteria the array of criteria
     * @param criteriaName the type of criteria to retrieve
     */
    public checkIfCriteriaExist(allCriteria: Criteria[], criteriaName: string): boolean {
        let result = false;
        for (let i = 0; i < allCriteria.length; i++) {
            if (allCriteria[i].name === criteriaName) {
                result = true;
            }
        }
        return result;
    }
}
