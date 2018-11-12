import { Component, OnInit } from '@angular/core';
import { ProductService } from 'app/entities/product';
import { HttpResponse } from '@angular/common/http';
import { Product } from 'app/shared/model/product.model';

@Component({
    selector: 'jhi-product-list',
    templateUrl: './product-list.component.html',
    styles: []
})
export class ProductListComponent implements OnInit {
    allProducts: Product[];

    constructor(private productService: ProductService) {
        this.productService.query().subscribe((res: HttpResponse<Product[]>) => this.bindBody(res.body));
    }

    private bindBody(data: Product[]) {
        this.allProducts = data;
    }

    ngOnInit() {}
}
