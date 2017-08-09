import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { GlobalVariables } from '../../global';
import { Observable } from 'rxjs';
import { SearchService } from '../search-result/search.service';
import { Profilkriterium } from '../../models/Profilkriterium.interface';

@Injectable()
export class PbapiMatchningService {
  private pbApi = GlobalVariables.PBAPI_URL;

  constructor(private http: Http) {
  }

  getMatchingAds(criteria: Array<Profilkriterium>, numberOfAdsPerSection: number, offset: number) {
    const searchCriteria = this.getSearchRequestBodyForCriteria(criteria, numberOfAdsPerSection, offset);
    const url = `${this.pbApi}/matchning/matchandeRekryteringsbehov`;
    return this.http.post(url, searchCriteria)
      .map(this.extractData)
      .catch(this.handleError)
      .toPromise();
  }

  getNumberOfAvailableJobs() {
    const url = `${this.pbApi}/matchning/rekryteringsbehov/antal`;
    return this.http.get(url)
      .map(this.extractData)
      .catch(this.handleError)
      .toPromise();
  }

  private getSearchRequestBodyForCriteria(criteria: Array<Profilkriterium>, numberOfAdsPerSection: number, offset: number) {
    return {
      'matchningsprofil': {
        'profilkriterier': criteria
      },
      'maxAntal': numberOfAdsPerSection,
      'startrad': offset
    };
  }

  private extractData(response: Response) {
    const body = response.json();
    return body || {};
  }

  private handleError(error: Response | any) {
    console.error('An error occurred', error);
    return Observable.throw(error);
  }

}
