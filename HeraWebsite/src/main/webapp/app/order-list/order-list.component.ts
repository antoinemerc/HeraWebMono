import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ITEMS_PER_PAGE } from 'app/shared';
import { OrderService } from '../entities/order/order.service';
import { LoginModalService, Principal } from 'app/core';
import { IOrderAndProducts } from '../shared/model/order_and_products.model';
import { HttpHeaders } from '@angular/common/http';
import { HttpResponse } from 'aws-sdk/global';
import { JhiParseLinks } from 'ng-jhipster';

@Component({
    selector: 'jhi-order-list',
    templateUrl: './order-list.component.html',
    styles: []
})
export class OrderListComponent implements OnInit {
    orders: IOrderAndProducts[];
    totalItems: any;
    itemsPerPage: any;
    routeData: any;
    page: any;
    reverse: any;
    predicate: any;
    previousPage: any;
    currentSearch: any;
    links: any;
    queryCount: any;

    constructor(
        private activatedRoute: ActivatedRoute,
        private orderService: OrderService,
        private principal: Principal,
        private router: Router,
        private loginService: LoginModalService,
        private parseLinks: JhiParseLinks
    ) {
        this.itemsPerPage = 5;
        this.routeData = this.activatedRoute.data.subscribe(data => {
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = data.pagingParams.ascending;
            this.predicate = data.pagingParams.predicate;
        });
    }

    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }

    loadAll() {
        if (this.isAuthenticated()) {
            this.principal.identity().then((userIdentity: Account) => {
                this.orderService
                    .findByUser(userIdentity.id, {
                        page: this.page - 1,
                        size: this.itemsPerPage
                    })
                    .subscribe((res: any) => this.paginateProducts(res.body, res.headers), (res: any) => console.log(res.message));
            });
        }
    }

    transition() {
        this.router.navigate(['/orders'], {
            queryParams: {
                page: this.page,
                size: this.itemsPerPage,
                search: this.currentSearch
            }
        });
        this.loadAll();
    }

    private paginateProducts(data: IOrderAndProducts[], headers: HttpHeaders) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        this.queryCount = this.totalItems;
        this.orders = data;
    }

    ngOnInit() {
        this.loadAll();
        // wait on an authentification and only then retrieve his information
        this.principal.getAuthenticationState().subscribe((userIdentity: Account) => {
            this.loadAll();
        });
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    logIn() {
        this.loginService.open();
    }

    hasOrders() {
        return this.orders === undefined || this.orders.length > 0;
    }
}
