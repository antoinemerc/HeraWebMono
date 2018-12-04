import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IOrder } from 'app/shared/model/order.model';

type EntityResponseType = HttpResponse<IOrder>;
type EntityArrayResponseType = HttpResponse<IOrder[]>;

@Injectable({ providedIn: 'root' })
export class OrderService {
    private resourceUrl = SERVER_API_URL + 'api/orders';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/orders';

    constructor(private http: HttpClient) {}

    create(order: IOrder): Observable<EntityResponseType> {
        return this.http.post<IOrder>(this.resourceUrl, order, { observe: 'response' });
    }

    update(order: IOrder): Observable<EntityResponseType> {
        return this.http.put<IOrder>(this.resourceUrl, order, { observe: 'response' });
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http.get<IOrder>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    findByUser(user: string): Observable<EntityArrayResponseType> {
        return this.http.get<IOrder[]>(`${this.resourceUrl}/user/${user}`, { observe: 'response' });
    }

    getPDF(id: string): Observable<HttpResponse<any>> {
        return this.http.get(`${this.resourceUrl}/pdf/${id}`, { observe: 'response', responseType: 'blob' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IOrder[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IOrder[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
