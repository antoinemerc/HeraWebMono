export interface IAddress {
    street1?: string;
    country?: string;
}

export class Address implements IAddress {
    constructor(public street1?: string, public country?: string) {}
}
