import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IProduct } from '../../shared/model/product.model';
import { ProductService } from './../../entities/product/product.service';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { LoginModalService, Principal, Account } from 'app/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'jhi-product-page',
    templateUrl: './product-page.component.html',
    styles: []
})
export class ProductPageComponent implements OnInit {
    product: IProduct;
    id: string;
    modalRef: NgbModalRef;

    constructor(
        private route: ActivatedRoute,
        private loginModalService: LoginModalService,
        private router: Router,
        private productService: ProductService,
        private principal: Principal
    ) {}

    ngOnInit() {
        this.route.params.subscribe((params: Params) => (this.id = params['id']));
        this.productService.find(this.id).subscribe((res: HttpResponse<IProduct>) => this.bindBody(res.body));
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    click() {
        console.log('Click');
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }

    private bindBody(data: IProduct) {
        this.product = data;
    }
}
