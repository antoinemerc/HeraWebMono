import { Component, OnInit, Input } from '@angular/core';
import { Principal, IUser, Account, UserService } from 'app/core';
import { IProduct } from '../../shared/model/product.model';
import { IComments, Comments } from '../../shared/model/comment.model';
import { HttpResponse } from '@angular/common/http';
import { ProductService } from 'app/shared/service/product.service';

@Component({
    selector: 'jhi-comment',
    templateUrl: './all-comment.component.html',
    styles: ['all-comment.scss']
})
export class AllCommentComponent implements OnInit {
    allComments: IComments[];
    @Input() product: IProduct;
    currentUser: IUser;
    accountConnected: Account;
    title: string;
    body: string;
    newComment: Comments;

    constructor(private productService: ProductService, public principal: Principal, private userService: UserService) {}

    ngOnInit() {
        this.allComments = this.product.comments;
        console.log(this.allComments);
    }

    addComment(event) {
        if (this.principal.isAuthenticated()) {
            this.principal.identity().then(account => {
                this.accountConnected = account;
                this.userService.find(this.accountConnected.login).subscribe((res: HttpResponse<IUser>) => {
                    this.currentUser = res.body;
                    console.log(this.currentUser);
                    this.newComment = new Comments(this.currentUser, this.title, this.body, 5, '15/11/2018');
                    console.log(this.newComment);
                    this.product.comments.push(this.newComment);
                    this.productService.update(this.product).subscribe(response => {
                        if (response.status === 200) {
                            console.log('OKI');
                        }
                    });
                });
            });
        }
        console.log(this.title);
        console.log(this.body);
    }
}
