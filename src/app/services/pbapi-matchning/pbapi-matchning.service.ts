import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { GlobalVariables } from '../../global';
import { Observable } from 'rxjs';

@Injectable()
export class PbapiMatchningService {
  private matchningsUrl = GlobalVariables.PBAPI_URL;

  constructor(private http: Http) {
  }

  getMatchingAds(criteria: Array<Object>) {
    const searchCriteria = {
      'matchningsprofil': {
        'profilkriterier': [
          {
            'namn': 'Stockholm',
            'varde': '0180',
            'typ': 'KOMMUN'
          }
        ]
      },
      'maxAntal': 2,
      'startrad': 0
    };

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

  private extractData(response: Response) {
    const body = response.json();
    return body || {};
  }

  private handleError(error: Response | any) {
    console.error('An error occurred', error);
    return Observable.throw(error);
  }

}
