import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { GlobalVariables } from '../../global';
import { Observable } from 'rxjs';
import { Profilkriterium } from '../../models/Profilkriterium.interface';

@Injectable()
export class GeoapiService {
  private geoApi = GlobalVariables.GEOAPI_URL;

  constructor(private http: Http) { }

  getOrtByPostnummer(prefix: string) {
    const url = `${this.geoApi}/postnummer?postnummerPrefix=${prefix}`;
    this.http.get(url)
      .map(this.extractData)
      .catch((err, caught) => {
        throw new Error(err);
      })
      .toPromise().then((result) => {
      	console.log(result);
      }, (failure) => {
      	console.log(failure);
      });
  } 

  private extractData(response: Response) {
    const body = response.json();
    return body || {};
  }

}
