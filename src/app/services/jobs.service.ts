import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import { Observable } from 'rxjs/RX';
import 'rxjs/add/operator/map';

@Injectable()
export class JobsService {
    constructor(private http: Http) {
        console.log('JobsService Initialized...');
    }

    getLocalData() {
        alert('test');
        return this.http.get('./assets/response.json')
            .map(res => res.json().rekryteringsbehov);
    }

    getLocalSelection() {
        return this.http.get('./assets/selection.json')
            .map(res => res.json().rekryteringsbehovdetaljer).catch(this.handleError);
    }

    private handleError(error: Response | any) {
      return Observable.throw(error);
    }
}
