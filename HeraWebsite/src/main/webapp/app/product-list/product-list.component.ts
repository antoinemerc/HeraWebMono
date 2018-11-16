import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { ProductService } from 'app/entities/product';
import { HttpResponse } from '@angular/common/http';
import { Product } from 'app/shared/model/product.model';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'app/entities/category';
import { Category } from 'app/shared/model/category.model';

@Component({
    selector: 'jhi-product-list',
    templateUrl: './product-list.component.html',
    styles: []
})
export class ProductListComponent implements OnInit, OnChanges {
    allProducts: Product[];
    category = false;
    currentCategory: Category = null;

    constructor(private productService: ProductService, private route: ActivatedRoute, private categoryService: CategoryService) {}

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.loadCategory(params['idCategory']);
        });
    }

    ngOnChanges(changes: SimpleChanges) {}

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
