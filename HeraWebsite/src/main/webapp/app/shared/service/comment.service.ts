import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CommentService {
    constructor() {}

    getAllComments(id: Number) {
        console.log(id);
        // return require('app/data-test/comments.json');
    }
}
