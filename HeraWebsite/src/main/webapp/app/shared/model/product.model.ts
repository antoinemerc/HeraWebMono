export interface IProduct {
    id?: string;
    name?: string;
    description?: string;
    quantity?: number;
    price?: number;
}

export class Product implements IProduct {
    constructor(public id?: string, public name?: string, public description?: string, public quantity?: number, public price?: number) {}
}
