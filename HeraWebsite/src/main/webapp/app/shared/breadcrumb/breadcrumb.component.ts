import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'jhi-breadcrumb',
    templateUrl: './breadcrumb.component.html',
    styleUrls: ['./breadcrumb.scss']
})
export class BreadcrumbComponent implements OnInit {
    @Input() breads: string[];
    @Input() routes: string[];
    constructor() {}

    ngOnInit() {}
}
