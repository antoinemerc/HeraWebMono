import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from 'app/shared/breadcrumb/breadcrumb.component';

@NgModule({
    imports: [CommonModule],
    declarations: [BreadcrumbComponent],
    exports: [BreadcrumbComponent]
})
export class BreadcrumbModule {}
