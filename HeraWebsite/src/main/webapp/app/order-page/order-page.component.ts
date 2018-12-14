import { Component, OnInit, Input } from '@angular/core';
import { OrderService } from 'app/entities/order';
import { Params, ActivatedRoute } from '@angular/router';
import { IOrder } from 'app/shared/model/order.model';
import { IProduct } from 'app/shared/model/product.model';
import { saveAs } from 'file-saver';
import { ImageUrlService } from 'app/shared/service/imageUrl.service';

@Component({
    selector: 'jhi-order-page',
    templateUrl: './order-page.component.html',
    styles: []
})
export class OrderPageComponent implements OnInit {
    order: IOrder;
    products: IProduct;
    id: string;
    loadingDone = false;
    downloading = false;

    constructor(private orderService: OrderService, private route: ActivatedRoute, private imageUrlService: ImageUrlService) {}

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
        if (!this.downloading) {
            this.downloading = true;
            this.orderService.getPDF(this.order.id).subscribe((res: any) => {
                saveAs(res.body, 'Order_' + this.order.id + '.pdf');
                this.downloading = false;
            });
        }
    }
}
