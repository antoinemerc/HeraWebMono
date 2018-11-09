import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';

import { IProduct } from './../../shared/model/product.model';

import { ProductService } from './../../entities/product/product.service';

@Component({
    selector: 'jhi-product-list',
    templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {
    products: IProduct[];

    constructor(private productService: ProductService) {}
    ngOnInit() {
        console.log(this.productService.query());
        this.productService.query().subscribe((res: HttpResponse<IProduct[]>) => this.bindBody(res.body));
    }

    private bindBody(data: IProduct[]) {
        this.products = data;
    }
}
