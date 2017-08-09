import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { GlobalVariables } from '../../global';
import { Observable } from 'rxjs';
import { Profilkriterium } from '../../models/Profilkriterium.interface';
import { ProfilkriteriumTyper } from './ProfilkriteriumTyper';

@Injectable()
export class PbapiKriterierService {
  private pbApi = GlobalVariables.PBAPI_URL;

  private cachedResponses:Object = {};

  constructor(private http: Http) { }

  getKriterieTyper(): Promise<Array<string>> {
    // This should probably be a backend-service, depends a litle on how it's implemented in matchning component.
    // TODO: Implement an api-call to get this list.
    return Promise.resolve(ProfilkriteriumTyper);
  }

  getKriterierForType(type: string): Promise<Array<Profilkriterium>> {
    const key = this.getKeyFromType(type);
    return new Promise((resolve, reject) => {
      if (this.hasCachedValue(key)) {
        resolve(this.cachedResponses[key]);
      } else {
        const url = `${this.pbApi}/matchning/matchningskriterier?typer=${type}`;
        this.http.get(url)
          .map(this.extractData)
          .catch((err, caught) => {
            throw new Error(err);
          })
          .toPromise().then((result) => {
            this.cachedResponses[key] = this.parseResponse(key, result);            
            resolve(this.cachedResponses[key]);
          }, (failure) => {
            reject(failure);
          });
      }
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