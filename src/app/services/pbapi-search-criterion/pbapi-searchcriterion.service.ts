import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { GlobalVariables } from '../../global';
import { Observable } from 'rxjs';
import { SearchService } from '../search-result/search.service';
import { SearchCriterion } from '../../models/SearchCriterion.interface';
import { SearchCriteriaTypes } from './SearchCriteriaTypes';

@Injectable()
export class PbapiSearchcriterionService {
  private matchningsUrl = GlobalVariables.PBAPI_URL;

  private cachedResponses = {};
  private observables = {};

  constructor(private http: Http) { }

  getSearchCriteraTypes() {
    // This should probably be a backend-service, depends a litle on how it's implemented in matchning component.
    // TODO: Implement an api-call to get this list.
    return SearchCriteriaTypes;
  }

  getSearchCriteriaForType(type: string): Observable<Array<Object>> {
    const key =  `getSearchCriteriaForType:${type}`;
    // Do we have a cached observable for this key already?
    if (this.hasCachedValue(key)) {
      return Observable.of(this.cachedResponses[key]);
    } else if (this.hasObservable(key)) {
      return this.observables[key];
    } else {
      const url = `${this.matchningsUrl}/matchning/matchningskriterier?typer=${type}`;
      this.observables[key] = this.http.get(url)
        .map(this.extractData)
        .share()
        .catch(this.handleError);
      return this.observables[key];
    }
  }

  private hasCachedValue(key: string) {
    return this.cachedResponses.hasOwnProperty(key);
  }

  private hasObservable(key: string) {
    return this.observables.hasOwnProperty(key);
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