import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransportManagementComponent } from './transport-management.component';
import { RouterModule } from '@angular/router';
import { TRANSPORT_MANAGEMENT_ROUTE } from './transport-management.route';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [CommonModule, RouterModule.forChild(TRANSPORT_MANAGEMENT_ROUTE), FormsModule],
    declarations: [TransportManagementComponent],
    exports: [TransportManagementComponent]
})
export class TransportManagementModule {}
