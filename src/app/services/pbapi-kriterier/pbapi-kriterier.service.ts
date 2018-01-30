import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { GlobalVariables } from '../../global';
import { Observable } from 'rxjs';
import { Profilkriterium } from '../../models/Profilkriterium';
import { ProfilkriteriumTyper } from './ProfilkriteriumTyper';
import { SynonymSearchResultDTO } from 'app/models/SynonymSearchResultDTO';
import { KriterieSearch } from 'app/models/KriterieSearch';

@Injectable()
export class PbapiKriterierService {
  private pbApi = GlobalVariables.PBAPI_URL;

  private cachedResponses:Object = {};

  constructor(private httpClient: HttpClient) {}

  getKriterieTyper(): Promise<Array<string>> {
    // This should probably be a backend-service, depends a litle on how it's implemented in matchning component.
    // TODO: Implement an api-call to get this list.
    return Promise.resolve(ProfilkriteriumTyper);
  }

  getKriterierForType(type: string): Promise<Array<Profilkriterium>> {
    const key = this.getKeyFromType(type);
    console.log(key);

    return new Promise((resolve, reject) => {
      if (this.hasCachedValue(key)) {
        resolve(this.cachedResponses[key]);
      } else {
        const url = `${this.pbApi}/matchning/matchningskriterier?typer=${type}`;
        this.httpClient.get(url).subscribe(data => {
          const result = data as Array<Profilkriterium>;
          resolve(result);
        });
      }
    });
  }

  getJobbaIKriterier(filter: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const url = `${this.pbApi}/matchning/matchningskriterier?typer=kommuner&typer=lan&typer=lander&namnfilter=${filter}`;
      this.httpClient.get(url).subscribe(data => {
        const result = data as Array<Profilkriterium>;
        resolve(result);
      });
    })
  }

  getKriterierForTypeAndFilter(type: string, filter: string): Promise<KriterieSearch> {
    return new Promise((resolve, reject) => {
      const url = `${this.pbApi}/matchning/matchningskriterierSynonym?typer=${type}&namnfilter=${filter}`;
      this.httpClient.get(url).subscribe(data => {
        const result = data as KriterieSearch;
        resolve(result);
      });
    });
  }

  private parseResponse(key:string, result) {
    const resultArray = [];
    result.forEach((element) => {
      //Profilkriterium
      const kriterium: Profilkriterium = element;
      resultArray.push(kriterium);
    });
    return resultArray;
  }

  private extractData(response: Response) {
    const body = response.json();
    return body || {};
  }

  hasKriterierForType(type: string) {
    return this.hasCachedValue(this.getKeyFromType(type));
  }

  private hasCachedValue(key: string) {
    return this.cachedResponses.hasOwnProperty(key);
  }

  private getKeyFromType(type: string) {
    return `searchCriteriaForType:${type}`;
  }


}