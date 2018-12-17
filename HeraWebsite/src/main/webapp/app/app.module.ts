import './vendor.ts';

import { NgModule, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { Ng2Webstorage, LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { JhiEventManager } from 'ng-jhipster';

import { AuthInterceptor } from './blocks/interceptor/auth.interceptor';
import { AuthExpiredInterceptor } from './blocks/interceptor/auth-expired.interceptor';
import { ErrorHandlerInterceptor } from './blocks/interceptor/errorhandler.interceptor';
import { NotificationInterceptor } from './blocks/interceptor/notification.interceptor';
import { HeraShopSharedModule } from 'app/shared';
import { HeraShopCoreModule } from 'app/core';
import { HeraShopAppRoutingModule } from './app-routing.module';
import { HeraShopHomeModule } from './home/home.module';
import { HeraShopAccountModule } from './account/account.module';
import { HeraShopEntityModule } from './entities/entity.module';
import * as moment from 'moment';

// jhipster-needle-angular-add-module-import JHipster will add new module here
import {
    JhiMainComponent,
    NavbarComponent,
    FooterComponent,
    PageRibbonComponent,
    ActiveMenuDirective,
    ErrorComponent,
    BreadcrumbCustomComponent,
    SidebarComponent
} from './layouts';
import { McBreadcrumbsModule } from 'ngx-breadcrumbs';
import { ProductPageModule } from './product-page/product-page.module';
import { MyCartModule } from './my-cart/my-cart.module';
import { OrderModule } from './order/order.module';
import { BreadcrumbModule } from 'app/shared/breadcrumb/breadcrumb.module';
import { OrderPageModule } from './order-page/order-page.module';

@NgModule({
    imports: [
        BrowserModule,
        McBreadcrumbsModule.forRoot(),
        HeraShopAppRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-' }),
        HeraShopSharedModule,
        HeraShopCoreModule,
        HeraShopHomeModule,
        HeraShopAccountModule,
        HeraShopEntityModule,
        ProductPageModule,
        MyCartModule,
        OrderModule,
        BreadcrumbModule,
        OrderPageModule
        // jhipster-needle-angular-add-module JHipster will add new module here
    ],
    declarations: [
        JhiMainComponent,
        NavbarComponent,
        ErrorComponent,
        BreadcrumbCustomComponent,
        PageRibbonComponent,
        ActiveMenuDirective,
        FooterComponent,
        SidebarComponent
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
            deps: [LocalStorageService, SessionStorageService]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthExpiredInterceptor,
            multi: true,
            deps: [Injector]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorHandlerInterceptor,
            multi: true,
            deps: [JhiEventManager]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: NotificationInterceptor,
            multi: true,
            deps: [Injector]
        }
    ],
    bootstrap: [JhiMainComponent]
})
export class HeraShopAppModule {
    constructor(private dpConfig: NgbDatepickerConfig) {
        this.dpConfig.minDate = { year: moment().year() - 100, month: 1, day: 1 };
    }
}
