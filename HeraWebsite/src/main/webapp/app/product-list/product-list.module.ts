import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [CommonModule, RouterModule],
    declarations: [ProductListComponent, ProductItemComponent],
    exports: [ProductListComponent, ProductItemComponent]
})
export class ProductListModule {}
