import { NgModule } from '@angular/core';
import { PagePostCommandeComponent } from 'app/order/page-post-commande/page-post-commande.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ORDERDETAILS_ROUTE } from 'app/order/page-post-commande/page-post-commande.route';
import { OrderListComponent } from 'app/order-list/order-list.component';
import { OrderItemComponent } from 'app/order-list/order-item/order-item.component';
import { OrderDetailComponent } from 'app/entities/order/order-detail.component';

@NgModule({
    declarations: [PagePostCommandeComponent, OrderDetailComponent, OrderListComponent, OrderItemComponent],
    imports: [BrowserModule, FormsModule, CommonModule, RouterModule.forRoot(ORDERDETAILS_ROUTE)],
    providers: [],
    bootstrap: [PagePostCommandeComponent]
})
export class pagePostCommandeModule {}
