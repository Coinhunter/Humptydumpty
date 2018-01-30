import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalVariables } from '../../global';
import { Observable } from 'rxjs';
import { SearchService } from '../search-result/search.service';
import { Profilkriterium } from '../../models/Profilkriterium';

@Injectable()
export class PbapiMatchningService {
  private pbApi = GlobalVariables.PBAPI_URL;

  constructor(private httpClient: HttpClient) {
  }

  getMatchingAds(criteria: Array<Profilkriterium>, numberOfAdsPerSection: number, offset: number) {
    const searchCriteria = this.getSearchRequestBodyForCriteria(criteria, numberOfAdsPerSection, offset);
    const url = `${this.pbApi}/matchning/matchandeRekryteringsbehov`;
    return this.httpClient.post(url, searchCriteria)
      .map(this.extractData)
      .catch(this.handleError)
      .toPromise();
  }

  getNumberOfAvailableJobs() {
    const url = `${this.pbApi}/matchning/rekryteringsbehov/antal`;
    return this.httpClient.get(url).toPromise();
  }

  getAd(id: string) {
    const url = `${this.pbApi}/matchning/matchandeRekryteringsbehov/${id}`;
    return this.httpClient.post(url, {}) // Consider inputting profile information here.. 
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
    // If request fails, throw an Error that will be caught
    if(response.status < 200 || response.status >= 300) {
      console.log(response);
      throw new Error('This request has failed ' + response.status);
    } 
    // If everything went fine, return the response
    else {
      return response.json();
    }
  }

  private handleError(error: Response | any) {
    return Observable.throw(error);
  }

}
