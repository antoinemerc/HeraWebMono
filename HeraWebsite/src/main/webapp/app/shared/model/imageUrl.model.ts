export interface IImageUrl {
    url?: string;
    alternativeText?: string;
}

export class ImageUrl implements IImageUrl {
    constructor(public url?: string, public alternativeText?: string) {}
}
