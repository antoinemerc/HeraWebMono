import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IProduct } from '../../shared/model/product.model';
import { ProductService } from './../../entities/product/product.service';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';

@Component({
    selector: 'jhi-product-page',
    templateUrl: './product-page.component.html',
    styles: []
})
export class ProductPageComponent implements OnInit {
    product: IProduct;
    id: string;

    constructor(private route: ActivatedRoute, private router: Router, private productService: ProductService) {}

    ngOnInit() {
        this.route.params.subscribe((params: Params) => (this.id = params['id']));
        this.productService.find(this.id).subscribe((res: HttpResponse<IProduct>) => this.bindBody(res.body));
    }

    private bindBody(data: IProduct) {
        this.product = data;
    }
}
