import { Component, OnInit } from '@angular/core';
import { SidebarService } from './sidebar.service';

@Component({
    selector: 'jhi-sidebar',
    templateUrl: './jhi-sidebar.component.html',
    styleUrls: []
})
export class SidebarComponent implements OnInit {
    sidebarStatus = false;

    constructor() {}

    ngOnInit() {
        this.updateSidebar(this.sidebarStatus);
    }

    updateSidebar(newStatus: boolean): void {
        this.sidebarStatus = newStatus;
    }
}
