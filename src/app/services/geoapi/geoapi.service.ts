import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { HttpErrorResponse } from '@angular/common/http';

import { GlobalVariables } from '../../global';
import { Observable } from 'rxjs';
import { Profilkriterium } from '../../models/Profilkriterium.interface';

@Injectable()
export class GeoapiService {
  private geoApi = GlobalVariables.GEOAPI_URL;

  constructor(private http: Http) { }

  // Måste fixa så att man inte måste skicka med ett prefix! :O wtf liksom... 
  getOrtByPostnummer(prefix: string): Promise<any> {
    const url = `${this.geoApi}/postnummer?postnummerPrefix=${encodeURIComponent(prefix)}`;
    return new Promise((resolve, reject) => {
      this.http.get(url)
        .map(this.extractData)
        .catch((err, caught) => {
          throw new Error(err);
        })
        .toPromise().then((result) => {
          resolve(result);
        }, (failure) => {
          reject(failure);
        });
    });
  }

  /*
  getAdresser(prefix: string): Promise<any> {
    const url = `${this.geoApi}/postnummer?postnummerPrefix=${encodeURIComponent(prefix)}`;
    return new Promise((resolve, reject) => {
      this.http.get(url)
        .subscribe(data => {

        }, (err: HttpErrorResponse) => {

        })
    });
  }
  */

  private extractData(response: Response) {
    const body = response.json();
    return body || {};
  }

}
