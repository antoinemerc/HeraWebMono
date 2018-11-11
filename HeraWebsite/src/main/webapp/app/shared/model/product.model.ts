import { User } from '../../core/user/user.model';
import { Category } from './category.model';
import { Comment } from './comment.model';

export interface IProduct {
    id?: string;
    name?: string;
    description?: string;
    allImageUrl?: string[];
    quantity?: number;
    price?: number;
    user?: User;
    categories?: Category[];
    comments?: Comment[];
}

export class Product implements IProduct {
    constructor(
        public id?: string,
        public name?: string,
        public description?: string,
        public allImageUrl?: string[],
        public quantity?: number,
        public price?: number,
        public user?: User,
        public categories?: Category[],
        public comments?: Comment[]
    ) {}
}
