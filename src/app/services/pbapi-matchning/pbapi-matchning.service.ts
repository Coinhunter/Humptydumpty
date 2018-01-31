import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalVariables } from '../../global';
import { Observable } from 'rxjs';
import { SearchService } from '../search-result/search.service';
import { Profilkriterium } from '../../models/Profilkriterium';
import { SearchResult } from '../../models/SearchResult';

@Injectable()
export class PbapiMatchningService {
  private pbApi = GlobalVariables.PBAPI_URL;

  constructor(private httpClient: HttpClient) {
  }

  getNumberOfAvailableJobs():Observable<string> {
    const url = `${this.pbApi}/matchning/rekryteringsbehov/antal`;
    return this.httpClient.get<string>(url);
  }
  
  getMatchingAds(criteria: Array<Profilkriterium>, numberOfAdsPerSection: number, offset: number):Observable<SearchResult> {
    const searchCriteria = this.getSearchRequestBodyForCriteria(criteria, numberOfAdsPerSection, offset);
    const url = `${this.pbApi}/matchning/matchandeRekryteringsbehov`;
    return this.httpClient.post<SearchResult>(url, searchCriteria);
  }

  getAd(id: string):Observable<object> {
    const url = `${this.pbApi}/matchning/matchandeRekryteringsbehov/${id}`;
    return this.httpClient.post(url, {});
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
}
