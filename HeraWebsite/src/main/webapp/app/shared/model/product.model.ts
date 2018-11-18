import { User } from '../../core/user/user.model';
import { Category } from './category.model';
import { Comments } from './comment.model';
import { ImageUrl } from './imageUrl.model';

export interface IProduct {
    id?: string;
    name?: string;
    description?: string;
    allImageUrl?: ImageUrl[];
    quantity?: number;
    price?: number;
    user?: User;
    categories?: Category[];
    comments?: Comments[];
}

export class Product implements IProduct {
    constructor(
        public id?: string,
        public name?: string,
        public description?: string,
        public allImageUrl?: ImageUrl[],
        public quantity?: number,
        public price?: number,
        public user?: User,
        public categories?: Category[],
        public comments?: Comments[]
    ) {}
}
