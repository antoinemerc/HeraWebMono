import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidationPageComponent } from './validation-page.component';
import { RouterModule } from '@angular/router';
import { VALIDATION_PAGE_ROUTE } from './validation-page.route';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [CommonModule, RouterModule.forChild(VALIDATION_PAGE_ROUTE), FormsModule],
    declarations: [ValidationPageComponent],
    exports: [ValidationPageComponent]
})
export class ValidationPageModule {}
