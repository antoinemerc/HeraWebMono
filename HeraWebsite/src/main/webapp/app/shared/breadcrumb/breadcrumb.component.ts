import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'jhi-breadcrumb',
    templateUrl: './breadcrumb.component.html',
    styleUrls: ['./breadcrumb.scss']
})
export class BreadcrumbComponent implements OnInit {
    @Input() breads: string[];
    @Input() routes: string[];
    constructor(private router: Router) {}

    ngOnInit() {}

    goTo(bread) {
        const id_ = this.breads.indexOf(bread);
        this.router.navigateByUrl(this.routes[id_]);
    }
}
