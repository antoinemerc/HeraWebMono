export interface ITransportationMethod {
    id?: string;
    name?: string;
    fixCost?: number;
    percentCost?: number;
}

export class TransportationMethod implements ITransportationMethod {
    constructor(public id?: string, public name?: string, public fixCost?: number, public percentCost?: number) {}
}
