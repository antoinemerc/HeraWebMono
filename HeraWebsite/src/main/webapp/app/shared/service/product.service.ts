import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IProduct } from 'app/shared/model/product.model';
import { IUser } from 'app/core';

type EntityResponseType = HttpResponse<IProduct>;
type EntityArrayResponseType = HttpResponse<IProduct[]>;

@Injectable({ providedIn: 'root' })
export class ProductService {
    private resourceUrl = SERVER_API_URL + 'api/products';
    private resourceUrlCategory = SERVER_API_URL + 'api/products/category/';
    private resourceUrlBasket = SERVER_API_URL + 'api/products/basket';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/products';

    constructor(private http: HttpClient) {}

    create(product: IProduct): Observable<EntityResponseType> {
        return this.http.post<IProduct>(this.resourceUrl, product, { observe: 'response' });
    }

    update(product: IProduct): Observable<EntityResponseType> {
        return this.http.put<IProduct>(this.resourceUrl, product, { observe: 'response' });
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http.get<IProduct>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IProduct[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IProduct[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }

    queryCategory(categoryId: string): Observable<EntityArrayResponseType> {
        return this.http.get<IProduct[]>(`${this.resourceUrlCategory}/${categoryId}`, { observe: 'response' });
    }

    queryBasket(user: IUser): Observable<EntityArrayResponseType> {
        return this.http.post<IProduct[]>(this.resourceUrlBasket, user, { observe: 'response' });
    }
}
