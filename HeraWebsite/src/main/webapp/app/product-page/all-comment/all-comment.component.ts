import { Component, OnInit, Input } from '@angular/core';
import { CommentService } from './comment.service';

@Component({
    selector: 'jhi-comment',
    templateUrl: './all-comment.component.html',
    styles: ['all-comment.scss']
})
export class AllCommentComponent implements OnInit {
    @Input() allComments: Comment[];

    constructor(private comments: CommentService) {}

    ngOnInit() {
        // this.productComments = this.comments.getAllComments(1);
    }
}
