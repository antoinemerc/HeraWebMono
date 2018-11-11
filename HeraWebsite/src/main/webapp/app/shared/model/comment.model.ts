import { User } from '../../core/user/user.model';

export interface IComment {
    user?: User;
    title?: string;
    body?: string;
    note?: number;
    date?: Date;
}

export class Comment implements IComment {
    constructor(public user?: User, public title?: string, public body?: string, public note?: number, public date?: Date) {}
}
