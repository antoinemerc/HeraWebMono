import { NgModule } from '@angular/core';
import { PaymentComponent } from 'app/payment/payment.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [PaymentComponent],
    imports: [BrowserModule, FormsModule],
    providers: [],
    bootstrap: [PaymentComponent]
})
export class PaymentModule {}
