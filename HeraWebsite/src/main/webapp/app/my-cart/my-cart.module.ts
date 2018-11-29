import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MyCartComponent } from './my-cart.component';
import { RouterModule } from '@angular/router';
import { MY_CART_ROUTE } from './my-cart.route';
import { MyCartListComponent } from './my-cart-list/my-cart-list.component';

@NgModule({
    imports: [CommonModule, RouterModule.forChild(MY_CART_ROUTE), FormsModule],
    declarations: [MyCartComponent, MyCartListComponent],
    entryComponents: [],
    providers: []
})
export class MyCartModule {}
