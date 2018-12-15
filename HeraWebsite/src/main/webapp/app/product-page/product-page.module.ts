import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BreadcrumbModule } from 'app/shared/breadcrumb/breadcrumb.module';
import { ProductPageComponent } from './product-page.component';
import { PRODUCT_PAGE_ROUTE } from './product-page.route';
import { AllCommentComponent } from './all-comment/all-comment.component';
import { HeraShopSharedModule } from 'app/shared';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forRoot(PRODUCT_PAGE_ROUTE, { useHash: true }),
        FormsModule,
        HeraShopSharedModule,
        MatProgressSpinnerModule,
        BreadcrumbModule
    ],
    declarations: [ProductPageComponent, AllCommentComponent],
    entryComponents: [],
    providers: []
})
export class ProductPageModule {}
