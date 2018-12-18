import { Component, OnInit, Input } from '@angular/core';
import { Principal, IUser, Account, UserService } from 'app/core';
import { IProduct } from '../../shared/model/product.model';
import { IComments, Comments } from '../../shared/model/comment.model';
import { HttpResponse } from '@angular/common/http';
import { ProductService } from 'app/shared/service/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'jhi-comment',
    templateUrl: './all-comment.component.html',
    styleUrls: ['all-comment.scss']
})
export class AllCommentComponent implements OnInit {
    allComments: IComments[];
    @Input() product: IProduct;
    currentUser: IUser;
    accountConnected: Account;
    title: string;
    body: string;
    note: number;
    newComment: Comments;

    constructor(
        private productService: ProductService,
        private principal: Principal,
        private userService: UserService,
        private mySnackbar: MatSnackBar
    ) {}

    ngOnInit() {
        this.allComments = this.product.comments;
    }

    addComment(event) {
        if (this.principal.isAuthenticated()) {
            this.principal.identity().then(account => {
                this.accountConnected = account;
                this.userService.find(this.accountConnected.login).subscribe((res: HttpResponse<IUser>) => {
                    this.currentUser = res.body;
                    this.newComment = new Comments(this.currentUser, this.title, this.body, this.note, '15-11-2018');
                    this.product.comments.push(this.newComment);
                    this.productService.update(this.product).subscribe(data =>
                        this.mySnackbar.open('Your comment was successfully added !', null, {
                            duration: 2500,
                            verticalPosition: 'bottom',
                            horizontalPosition: 'end'
                        })
                    );
                });
            });
        }
    }
}
