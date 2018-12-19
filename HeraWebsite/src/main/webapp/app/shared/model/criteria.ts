export interface ICriteria {
    name?: string;
    value?: string | number;
}

export class Criteria implements ICriteria {
    constructor(public name?: string, public value?: string | number) {}
}
