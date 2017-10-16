import {Injectable} from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { GlobalVariables } from '../../global';
import { Observable } from 'rxjs';

@Injectable()
export class YrkenService {
    private pbApi = GlobalVariables.PBAPI_URL;
    constructor(private http: Http) {
    }

    getLocalSelection() {
        return this.http.get('./assets/yrken_all.json')
            .map(res => res.json());
    }

    getAllJobAreas () {
      const url = `${this.pbApi}/matchning/matchningskriterier/yrkesomraden`;
      return this.http.get(url)
        .map(this.extractData)
        .catch(this.handleError)
        .toPromise();
    }
    getJobGroupsForJobArea (id: string) {
      const url = `${this.pbApi}/matchning/matchningskriterier/yrkesgrupp?gruppid=` + id;
      return this.http.get(url)
        .map(this.extractData)
        .catch(this.handleError)
        .toPromise();
    }
    getJobsForJobGroup (id: string) {
      const url = `${this.pbApi}/matchning/matchningskriterier/yrken?gruppid=` + id;
      return this.http.get(url)
        .map(this.extractData)
        .catch(this.handleError)
        .toPromise();
    }

    private extractData(response: Response) {
      // If request fails, throw an Error that will be caught
      if (response.status < 200 || response.status >= 300) {
        console.log(response);
        throw new Error('This request has failed ' + response.status);
      } else { // If everything went fine, return the response
        return JSON.parse(response.text());
      }
    }
    private handleError(error: Response | any) {
      return Observable.throw(error);
    }
}
