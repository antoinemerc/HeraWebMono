import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressPageComponent } from './address-page.component';
import { RouterModule } from '@angular/router';
import { ADDRESS_PAGE_ROUTE } from './address-page.route';
import { FormsModule } from '@angular/forms';
import { AddressModalComponent } from './add-address-popup/add-address-popup.component';
@NgModule({
    imports: [CommonModule, RouterModule.forChild(ADDRESS_PAGE_ROUTE), FormsModule],
    declarations: [AddressPageComponent, AddressModalComponent],
    entryComponents: [AddressModalComponent],
    exports: [AddressPageComponent, AddressModalComponent]
})
export class AddressPageModule {}
