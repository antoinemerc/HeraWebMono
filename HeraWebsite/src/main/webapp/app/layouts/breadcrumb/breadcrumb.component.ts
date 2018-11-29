import { Component, OnInit } from '@angular/core';
import { McBreadcrumbsService, IBreadcrumb } from 'ngx-breadcrumbs';

@Component({
    selector: 'jhi-breadcrumb',
    templateUrl: './breadcrumb.component.html'
})
export class BreadcrumbCustomComponent implements OnInit {
    allBread = null;

    constructor(private breadCrumbService: McBreadcrumbsService) {}

    ngOnInit() {
        setTimeout(() => {
            this.breadCrumbService.crumbs$.forEach(this.addAllVariable.bind(this));
        });
    }

    addAllVariable(allBreadCrumbs: IBreadcrumb[]): void {
        this.allBread = allBreadCrumbs;
    }
}
