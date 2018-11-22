import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Product } from 'app/shared/model/product.model';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'app/shared/model/category.model';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import { ProductService } from 'app/shared/service/product.service';
import { CategoryService } from 'app/shared';
import { ImageUrlService } from 'app/shared/service/imageUrl.service';

@Component({
    selector: 'jhi-product-list',
    templateUrl: './product-list.component.html',
    styles: []
})
export class ProductListComponent implements OnInit {
    allProducts: Product[];
    category = false;
    currentCategory: Category = null;

    constructor(private productService: ProductService, private route: ActivatedRoute, private categoryService: CategoryService) {}

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.loadCategory(params['idCategory']);
        });
    }

    private loadCategory(categoryId: string) {
        if (categoryId == null) {
            this.category = false;
            this.productService.query().subscribe((res: HttpResponse<Product[]>) => this.bindBody(res.body));
        } else {
            this.category = true;
            this.categoryService.find(categoryId).subscribe((res: HttpResponse<Category>) => this.bindCategory(res.body));
            this.productService.queryCategory(categoryId).subscribe((res: HttpResponse<Product[]>) => this.bindBody(res.body));
        }
    }

    private bindCategory(data: Category) {
        this.currentCategory = data;
    }

    private bindBody(data: Product[]) {
        this.allProducts = data;
    }
}
