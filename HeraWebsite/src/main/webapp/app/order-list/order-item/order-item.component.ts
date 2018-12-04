import { Component, OnInit, Input } from '@angular/core';
import { IOrder } from 'app/shared/model/order.model';
import { IProduct } from '../../shared/model/product.model';
import { ProductService } from '../../shared/service/product.service';

@Component({
    selector: 'jhi-order-item',
    templateUrl: './order-item.component.html',
    styles: []
})
export class OrderItemComponent implements OnInit {
    @Input() order: IOrder;
    products: IProduct;
    constructor(private productService: ProductService) {}

    ngOnInit() {
        this.productService.queryBasket(this.order.orderLine).subscribe((res: any) => (this.products = res.body));
    }
}
