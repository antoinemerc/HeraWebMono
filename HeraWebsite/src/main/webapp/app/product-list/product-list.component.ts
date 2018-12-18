import { Component, OnInit, Input, SimpleChanges, OnChanges, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Product } from 'app/shared/model/product.model';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'app/shared/model/category.model';
import { ProductService } from 'app/shared/service/product.service';
import { CategoryService } from 'app/shared';
import { SidebarService } from 'app/layouts/sidebar/sidebar.service';
import { Criteria } from 'app/shared/model/searchCriteria';

@Component({
    selector: 'jhi-product-list',
    templateUrl: './product-list.component.html',
    styles: []
})
export class ProductListComponent implements OnInit, OnDestroy {
    allProducts: Product[] = [];
    category = false;
    productSearchName: string;
    pageTitle = '';
    searchComplex = '';
    subscribed = false;

    constructor(
        private productService: ProductService,
        private route: ActivatedRoute,
        private categoryService: CategoryService,
        private sidebarService: SidebarService
    ) {}

    ngOnInit() {
        this.route.params.subscribe(params => {
            if (params['displayCriteria'] !== undefined) {
                const criteria = params['displayCriteria'].split('=');

                if (criteria[0] === 'category') {
                    this.sidebarService.startNewCriteria('category', criteria[1]);
                } else if (criteria[0] === 'search') {
                    if (this.sidebarService.checkIfCriteriaExist('search')) {
                        this.sidebarService.updateCriteria('search', criteria[1]);
                    } else {
                        this.sidebarService.addCriteria('search', criteria[1]);
                    }
                }
                if (!this.subscribed) {
                    this.loadProductFromCriteria();
                }
            } else {
                this.loadProduct();
            }
        });
    }

    ngOnDestroy() {
        if (this.sidebarService.getSidebarStatus()) {
            this.sidebarService.setSidebarStatus(false);
            this.sidebarService.deleteAllCriteria();
        }
    }

    /**
     * Choose a source for the data
     */
    private loadProductFromCriteria() {
        this.sidebarService.getCriteria().subscribe(value => {
            this.subscribed = true;
            this.productSearchName = '';
            this.searchComplex = '';
            if (value.length > 1) {
                this.loadComplexSearch(value);
            } else {
                if (this.sidebarService.checkIfCriteriaExist('category')) {
                    this.loadCategory(value[0].value.toString());
                } else if (this.sidebarService.checkIfCriteriaExist('search')) {
                    this.loadSearch(value[0].value.toString());
                } else if (value.length === 0) {
                    this.pageTitle = '';
                    this.loadProduct();
                } else {
                    this.loadComplexSearch(value);
                }
            }
        });
    }

    /**
     * Category load
     * @param categoryId
     */
    private loadCategory(categoryId: string) {
        this.category = true;
        this.categoryService.find(categoryId).subscribe((res: HttpResponse<Category>) => this.bindCategory(res.body));
        this.productService.queryCategory(categoryId).subscribe((res: HttpResponse<Product[]>) => this.bindBody(res.body));
        this.deploySideBar();
    }

    /**
     * Search load
     * @param likeName the search term
     */
    private loadSearch(likeName: string) {
        this.productSearchName = likeName;
        this.pageTitle = 'Search Corresponding to: ' + likeName;
        this.productService.queryLikeName(likeName).subscribe((res: HttpResponse<Product[]>) => this.bindProduct(res.body));
        this.deploySideBar();
    }

    /**
     * Complex search from product page
     * @param criteria
     */
    private loadComplexSearch(criteria: Criteria[]) {
        let searchComplex = '';
        const allCategory = [];
        let search = '';
        let from = 0;
        let to = 100000;
        for (const cat of criteria) {
            if (cat.name === 'category') {
                allCategory.push(cat.value);
            } else if (cat.name === 'search') {
                search = cat.value.toString();
            } else if (cat.name === 'price') {
                const priceBracket = cat.value.toString().split('|');
                from = parseInt(priceBracket[0], 10);
                to = parseInt(priceBracket[1], 10);
            }
        }
        this.pageTitle = 'Search corresponding to your filter: ';
        if (search !== '') {
            searchComplex += 'Search for ' + search + ', ';
        } else if (from !== 0 || to !== 100000) {
            searchComplex += 'In between ' + from + ' and ' + to + ', ';
        }
        this.searchComplex = searchComplex.slice(0, -2);

        this.productService
            .queryComplexFilter(allCategory, search, from, to)
            .subscribe((res: HttpResponse<Product[]>) => this.bindBody(res.body));
    }

    /**
     * Home page load
     */
    private loadProduct() {
        this.category = false;
        this.productService.query().subscribe((res: HttpResponse<Product[]>) => this.bindBody(res.body));
    }

    private bindCategory(data: Category) {
        this.pageTitle = 'Category corresponding to: ' + data.name;
    }

    private bindBody(data: Product[]) {
        this.allProducts = data;
    }

    private bindProduct(data: Product[]) {
        this.category = false;
        this.allProducts = data;
    }

    private deploySideBar() {
        this.sidebarService.setSidebarStatus(true);
    }
}
