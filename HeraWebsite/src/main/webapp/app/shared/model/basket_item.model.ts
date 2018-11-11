import { Product } from './product.model';

export interface IBasketItem {
    prod?: string;
    quantity?: number;
}

export class BasketItem implements IBasketItem {
    constructor(public prod?: string, public quantity?: number) {}
}
