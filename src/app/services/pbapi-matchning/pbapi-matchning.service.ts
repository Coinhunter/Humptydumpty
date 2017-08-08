import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { GlobalVariables } from '../../global';
import { Observable } from 'rxjs';
import { SearchService } from '../search-result/search.service';
import { SearchCriterion } from '../../models/SearchCriterion.interface';

@Injectable()
export class PbapiMatchningService {
  private matchningsUrl = GlobalVariables.PBAPI_URL;

  constructor(private http: Http) {
  }

  getMatchingAds(criteria: Array<SearchCriterion>, numberOfAdsPerSection: number, offset: number) {
    const searchCriteria = this.getSearchRequestBodyForCriteria(criteria, numberOfAdsPerSection, offset);
    const url = `${this.matchningsUrl}/matchning/matchandeRekryteringsbehov`;
    return this.http.post(url, searchCriteria)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getNumberOfAvailableJobs(): Observable<number> {
    const url = `${this.matchningsUrl}/matchning/rekryteringsbehov/antal`;
    return this.http.get(url)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private getSearchRequestBodyForCriteria(criteria: Array<SearchCriterion>, numberOfAdsPerSection: number, offset: number) {
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
