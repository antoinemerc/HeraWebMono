import { Component, OnInit, Input } from '@angular/core';
import { OrderService } from 'app/entities/order';
import { Params, ActivatedRoute } from '@angular/router';
import { IOrder } from 'app/shared/model/order.model';
import { IProduct } from 'app/shared/model/product.model';
import { saveAs } from 'file-saver';

@Component({
    selector: 'jhi-order-detail',
    templateUrl: './order-detail.component.html',
    styles: []
})
export class OrderDetailComponent implements OnInit {
    order: IOrder;
    products: IProduct;
    id: string;
    loadingDone = false;

    constructor(private orderService: OrderService, private route: ActivatedRoute) {}

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.id = params['id'];
            this.orderService.findById(this.id).subscribe((res: any) => {
                this.order = res.body.order;
                this.products = res.body.products;
                this.loadingDone = true;
            });
        });
    }

    generatePDF() {
        this.orderService.getPDF(this.order.id).subscribe((res: any) => saveAs(res.body, 'Order_' + this.order.id + '.pdf'));
    }
}
