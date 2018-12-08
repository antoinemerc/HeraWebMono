import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { OrderDetailComponent } from './order-detail.component';

const routesConfig: Routes = [{ path: 'detailedOrder/:id', component: OrderDetailComponent }];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routesConfig), FormsModule],
    declarations: [OrderDetailComponent],
    entryComponents: [],
    providers: []
})
export class OrderDetailModule {}
