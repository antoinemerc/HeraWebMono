import { Component, OnInit, Input } from '@angular/core';
import { IOrder } from 'app/shared/model/order.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { OrderSharedService } from 'app/shared/service/order-shared.service';

@Component({
    selector: 'jhi-page-post-commande',
    templateUrl: './page-post-commande.component.html',
    styles: []
})
export class PagePostCommandeComponent implements OnInit {
    //@Input() order: IOrder;
    order: IOrder;
    id: string;
    today = Date.now();
    arrive_date = new Date();
    formattedDate: any;

    constructor(private route: ActivatedRoute, private orderSharedService: OrderSharedService, private router: Router) {
        this.route.params.subscribe(params => {
            console.log(params);
            this.id = params['id'];
        });
    }

    ngOnInit() {
        this.arrive_date.setDate(this.arrive_date.getDate() + 7);
        this.formattedDate = this.arrive_date.toISOString().slice(0, 10);
        console.log(this.formattedDate);
        this.order = this.orderSharedService.retrieve();
    }
}
