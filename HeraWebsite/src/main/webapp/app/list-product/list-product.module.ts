import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListProductComponent } from './list-product.component';
import { ItemProductComponent } from './item-product/item-product.component';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [CommonModule, RouterModule],
    declarations: [ListProductComponent, ItemProductComponent],
    exports: [ListProductComponent, ItemProductComponent]
})
export class ListProductModule {}
