import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITransportationMethod } from 'app/shared/model/transportation-method.model';

type EntityResponseType = HttpResponse<ITransportationMethod>;
type EntityArrayResponseType = HttpResponse<ITransportationMethod[]>;

@Injectable({ providedIn: 'root' })
export class TransportationMethodService {
    private resourceUrl = SERVER_API_URL + 'api/transportation-methods';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/transportation-methods';

    constructor(private http: HttpClient) {}

    create(transportationMethod: ITransportationMethod): Observable<EntityResponseType> {
        return this.http.post<ITransportationMethod>(this.resourceUrl, transportationMethod, { observe: 'response' });
    }

    update(transportationMethod: ITransportationMethod): Observable<EntityResponseType> {
        return this.http.put<ITransportationMethod>(this.resourceUrl, transportationMethod, { observe: 'response' });
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http.get<ITransportationMethod>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITransportationMethod[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITransportationMethod[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
