import { Component, OnInit, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { Router, ActivatedRouteSnapshot, NavigationEnd } from '@angular/router';

import { JhiLanguageHelper } from 'app/core';
import { SidebarService } from '../sidebar/sidebar.service';

@Component({
    selector: 'jhi-main',
    templateUrl: './main.component.html',
    styleUrls: ['main.component.scss']
})
export class JhiMainComponent implements OnInit, AfterViewChecked {
    sidebar = false;
    cssClass = '';

    constructor(
        private jhiLanguageHelper: JhiLanguageHelper,
        private router: Router,
        private sidebarService: SidebarService,
        private cdRef: ChangeDetectorRef
    ) {}

    private getPageTitle(routeSnapshot: ActivatedRouteSnapshot) {
        let title: string = routeSnapshot.data && routeSnapshot.data['pageTitle'] ? routeSnapshot.data['pageTitle'] : 'heraShopApp';
        if (routeSnapshot.firstChild) {
            title = this.getPageTitle(routeSnapshot.firstChild) || title;
        }
        return title;
    }

    ngOnInit() {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.jhiLanguageHelper.updateTitle(this.getPageTitle(this.router.routerState.snapshot.root));
            }
        });
        this.sidebarService.getSidebarStatus().subscribe(value => this.bindSideBar(value));
    }

    ngAfterViewChecked() {
        this.cdRef.detectChanges();
    }

    bindSideBar(value: boolean) {
        this.sidebar = value;
        if (this.sidebar) {
            this.cssClass = '';
        } else {
            this.cssClass = 'offset-1';
        }
    }
}
