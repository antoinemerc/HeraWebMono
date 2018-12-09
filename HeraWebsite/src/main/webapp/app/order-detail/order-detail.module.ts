import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { OrderDetailComponent } from './order-detail.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const routesConfig: Routes = [{ path: 'detailedOrder/:id', component: OrderDetailComponent }];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routesConfig), FormsModule, MatProgressSpinnerModule],
    declarations: [OrderDetailComponent],
    entryComponents: [],
    providers: []
})
export class OrderDetailModule {}
