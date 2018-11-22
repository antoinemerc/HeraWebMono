export interface IAddress {
    street1?: string;
    street2?: string;
    zipCode?: string;
    city?: string;
    country?: string;
}

export class Address implements IAddress {
    constructor(public street1?: string, public street2?: string, public zipCode?: string, public city?: string, public country?: string) {}
}
