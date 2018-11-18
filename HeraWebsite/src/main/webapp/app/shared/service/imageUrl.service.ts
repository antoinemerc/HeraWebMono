import { Injectable } from '@angular/core';
import { S3 } from 'aws-sdk/clients/all';
import { AWSError, Request, Response } from 'aws-sdk/global';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PromiseResult } from 'aws-sdk/lib/request';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ImageUrlService {
    private iamProfile: S3 = null;
    private resultSubject = null;
    private originalthis = null;

    public constructor(private _sanitizer: DomSanitizer) {
        this.iamProfile = new S3({
            accessKeyId: 'AKIAJCN5KQTGPBAPXQGQ',
            secretAccessKey: '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',
            region: 'eu-west-3'
        });
    }

    public getOneImageFrom(bucket: string, key: string): Observable<SafeResourceUrl> {
        const resultSubject: Subject<SafeResourceUrl> = new Subject<SafeResourceUrl>();
        const params = {
            Bucket: bucket,
            Key: key
        };
        // le truc le plus sale au monde: j'ai besoin d'un nouveau contexte this ou j'ai accès ET au this précédent et au subject propre a l'execution de la fonction
        // Je ne peux pas déclarer le subject au niveau de la classe sinon il sera partager pour tous les subscriber, je veux un subject par image.
        // Je ne peux plus dormir la nuit mais au moins c'est un accès sécuriser a un bucket S3 avec autentification iam et mise a jour dynamique
        const newThis = {
            originalthis: this,
            resultSubject
        };
        this.iamProfile.getObject(params, this.getImageUrl.bind(newThis));
        return resultSubject;
    }

    private getImageUrl(errtxt: AWSError, data: S3.GetObjectOutput): void {
        function encode(dataVar) {
            const str = dataVar.reduce(function(a, b) {
                return a + String.fromCharCode(b);
            }, '');
            return btoa(str).replace(/.{76}(?=.)/g, '$&\n');
        }
        if (errtxt) {
            console.log('lireFic', 'ERR ' + errtxt);
        } else {
            // console.log('lecture OK');
            this.resultSubject.next(
                this.originalthis._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + encode(data.Body))
            );
        }
    }
}
