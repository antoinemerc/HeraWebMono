import { IProduct } from './product.model';
import { IOrder } from './order.model';

export interface IOrderAndProducts {
    order?: IOrder;
    products?: IProduct[];
}

export class OrderAndProducts implements IOrderAndProducts {
    constructor(public order?: IOrder, public products?: IProduct[]) {}
}
