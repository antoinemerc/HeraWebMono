import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { Product } from 'app/shared/model/product.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ImageUrlService } from 'app/shared/service/imageUrl.service';

@Component({
    selector: 'jhi-product-item',
    templateUrl: './product-item.component.html',
    styles: []
})
export class ProductItemComponent implements OnInit, OnChanges {
    @Input() product: Product = null;
    mainImage: SafeResourceUrl = 'content/images/placeHolder.png';

    constructor(private imageUrlService: ImageUrlService, private _sanitizer: DomSanitizer) {}

    ngOnInit() {}

    ngOnChanges(changes: SimpleChanges) {
        if (this.product !== null) {
            if (this.product.allImageUrl.length !== 0) {
                this.imageUrlService.getOneImageFrom('heraimagescontainer', this.product.allImageUrl[0].url).subscribe(value => {
                    this.bindUrl(value);
                });
            }
        }
    }

    private bindUrl(data: SafeResourceUrl) {
        this.mainImage = data;
    }
}
