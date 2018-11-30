import { User } from '../../core/user/user.model';
import { TransportationMethod } from './transportation-method.model';
import { BasketItem } from '../../shared/model/basket_item.model';
import { Address } from './address.model';

export interface IOrder {
    id?: string;
    user?: User;
    orderLine?: BasketItem[];
    address?: Address;
    transportationMethod?: TransportationMethod;
    paymentMethod?: string;
    date?: string;
    state?: string;
    totalPrice?: number;
}

export class Order implements IOrder {
    constructor(
        public id?: string,
        public user?: User,
        public orderLine?: BasketItem[],
        public address?: Address,
        public transportationMethod?: TransportationMethod,
        public paymentMethod?: string,
        public date?: string,
        public state?: string,
        public totalPrice?: number
    ) {}
}
