import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { SidebarService } from './sidebar.service';
import { CategoryService, ProductService } from 'app/shared';
import { HttpResponse } from '@angular/common/http';
import { Category } from 'app/shared/model/category.model';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'jhi-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    allCategories: Category[];
    incomingCat = '';
    allSelectedCategory: string[] = [];

    constructor(private sidebarService: SidebarService, private categoryService: CategoryService, private productService: ProductService) {}

    ngOnInit() {
        this.categoryService.query().subscribe((res: HttpResponse<Category[]>) => this.bindBody(res.body));
        this.sidebarService.getSelectedCategory().subscribe(value => this.bindCategory(value));
    }

    ngOnDestroy() {
        this.allSelectedCategory = [];
    }

    private bindBody(data: Category[]) {
        this.allCategories = data;
    }

    private bindCategory(value: string) {
        this.incomingCat = value;
        this.allSelectedCategory = [value];
    }

    private onCheckboxChange(categoryIdCheckbox: string, event: any) {
        if (event.target.checked) {
            this.allSelectedCategory.push(categoryIdCheckbox);
        } else {
            for (let i = 0; i < this.allSelectedCategory.length; i++) {
                if (this.allSelectedCategory[i] === categoryIdCheckbox) {
                    this.allSelectedCategory.splice(i, 1);
                }
            }
        }
        //this.productService.
    }
}
