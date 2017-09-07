import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class YrkenService {
    constructor(private http: Http) {
        // console.log('YrkenService Initialized...');
    }

    getLocalSelection() {
        return this.http.get('./assets/yrkesomraden_modified.json')
            .map(res => res.json());
    }
}
