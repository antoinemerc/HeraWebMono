import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { RouterModule } from '@angular/router';
import { ALL_PRODUCT_LIST_ROUTE } from './product-list.route';
import { BreadcrumbModule } from 'app/shared/breadcrumb/breadcrumb.module';

@NgModule({
    imports: [CommonModule, RouterModule.forChild(ALL_PRODUCT_LIST_ROUTE), BreadcrumbModule],
    declarations: [ProductListComponent, ProductItemComponent],
    exports: [ProductListComponent, ProductItemComponent]
})
export class ProductListModule {}
