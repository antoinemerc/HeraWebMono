import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { RouterModule } from '@angular/router';
import { ALL_PRODUCT_LIST_ROUTE } from './product-list.route';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    imports: [CommonModule, RouterModule.forChild(ALL_PRODUCT_LIST_ROUTE), MatSnackBarModule, BrowserAnimationsModule],
    declarations: [ProductListComponent, ProductItemComponent],
    exports: [ProductListComponent, ProductItemComponent],
    providers: [{ provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500 } }]
})
export class ProductListModule {}
