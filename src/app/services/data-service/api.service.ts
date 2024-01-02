import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';
import { Site } from '../../shared/models/site.model';
import { Contact } from '../../shared/models/contact.model';
import { Configuration } from '../../app.constants';

@Injectable()
export class DataService {

    private actionUrl: string;
    private headers: Headers;

    constructor(private _http: Http, private _configuration: Configuration) {
        this.actionUrl = _configuration.Server+_configuration.apiLang;
    }

    public GetAll = (methodUrl: string): Observable<Site[]> => {
        return this._http.get(this.actionUrl+ methodUrl)
            .map((response: Response) => <Site[]>response.json())
            .catch(this.handleError);
    }

    public GetSingle = (methodUrl: string): Observable<Site> => {
        return this._http.get(this.actionUrl+ methodUrl)
            .map((response: Response) => <Site>response.json())
            .catch(this.handleError);
    }

    public Add = (methodUrl: string, params: object): Observable<Site> => {
        var headers = new Headers();
        return this._http.post(this.actionUrl + methodUrl, JSON.stringify(params), {headers, params})
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }

    public Addv2 = (methodUrl: string, params: object): Observable<Site> => {
        var headers = new Headers();
        return this._http.post(this.actionUrl + methodUrl, params, { headers })
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }


    private handleError(error: Response) {
        return Observable.throw(error.json().error || 'Server error');
    }
}
