import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { GlobalVariables } from '../../global';
import { Observable } from 'rxjs';
import { Profilkriterium } from '../../models/Profilkriterium.interface';

@Injectable()
export class AdService {

  private pbApi = GlobalVariables.PBAPI_URL;
  constructor(private http: Http) {
  }

  getMatchingAdById (id: string, criteria: Array<Profilkriterium>) {
    const searchCriteria = this.getSearchRequestBodyForCriteria(criteria);
    const url = `${this.pbApi}/matchning/matchandeRekryteringsbehov/` + id;
    return this.http.post(url, searchCriteria)
      .map(this.extractData)
      .catch(this.handleError)
      .toPromise();
  }
  private getSearchRequestBodyForCriteria(criteria: Array<Profilkriterium>) {
    return {
      'profilkriterier': criteria
    };
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
