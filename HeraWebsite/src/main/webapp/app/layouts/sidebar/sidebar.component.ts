import { Component, OnInit, Input, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { SidebarService } from './sidebar.service';
import { CategoryService, ProductService } from 'app/shared';
import { HttpResponse } from '@angular/common/http';
import { Category } from 'app/shared/model/category.model';
import { Criteria } from 'app/shared/model/searchCriteria';
import { Options } from 'ng5-slider';

@Component({
    selector: 'jhi-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {
    allCategories: Category[];
    incomingCat = [];
    allSelectedCategory: string[] = [];
    min = 0;
    max = 1000;
    options: Options = {
        floor: 0,
        ceil: 10000,
        step: 50
    };

    constructor(private sidebarService: SidebarService, private categoryService: CategoryService, private productService: ProductService) {}

    ngOnInit() {
        this.categoryService.query().subscribe((res: HttpResponse<Category[]>) => this.bindBody(res.body));
        this.sidebarService.getCriteria().subscribe(value => this.bindCategory(value));
    }

    ngOnDestroy() {}

    private bindBody(data: Category[]) {
        this.allCategories = data;
    }

    private bindCategory(value: Criteria[]) {
        const allSelectedCat = this.sidebarService.getSpecificCriteria(value, 'category');
        if (allSelectedCat !== null) {
            this.incomingCat = allSelectedCat.map(a => a.value);
            this.allSelectedCategory = this.incomingCat;
        }
    }

    private onCheckboxChange(categoryIdCheckbox: string, event: any) {
        if (event.target.checked) {
            this.allSelectedCategory.push(categoryIdCheckbox);
            this.sidebarService.addCriteria('category', categoryIdCheckbox);
        } else {
            for (let i = 0; i < this.allSelectedCategory.length; i++) {
                if (this.allSelectedCategory[i] === categoryIdCheckbox) {
                    this.allSelectedCategory.splice(i, 1);
                }
            }
            this.sidebarService.deleteCriteria('category', categoryIdCheckbox);
        }
    }

    private onSliderUpdate() {
        console.log('OK');
        console.log(this.min);
        console.log(this.max);
    }
}
