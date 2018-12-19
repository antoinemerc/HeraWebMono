import { NgModule, ModuleWithProviders } from '@angular/core';
import { ValidationPageComponent } from 'app/order/validation-page/validation-page.component';
import { PagePostCommandeComponent } from 'app/order/page-post-commande/page-post-commande.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PAGEPOSTCOMMANDE_ROUTE } from 'app/order/validation-page/validation-page.route';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [ValidationPageComponent, PagePostCommandeComponent],
    imports: [BrowserModule, FormsModule, RouterModule.forRoot(PAGEPOSTCOMMANDE_ROUTE), CommonModule],
    providers: [],
    bootstrap: [ValidationPageComponent]
})
export class validationPageModule {}
