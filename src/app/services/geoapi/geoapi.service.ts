import {NgModule} from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { GlobalVariables } from '../../global';
import { Observable } from 'rxjs/rx';
import { Profilkriterium } from '../../models/Profilkriterium.interface';

@NgModule({
  imports: [
    BrowserModule,
    // Include it under 'imports' in your application module
    // after BrowserModule.
    HttpClientModule,
  ],
})
@Injectable()
export class GeoapiService {
  private geoApi = GlobalVariables.GEOAPI_URL;

  constructor(private http: HttpClient) { }

  // Måste fixa så att man inte måste skicka med ett prefix! :O wtf liksom...
  getOrtByPostnummer(prefix: string): Promise<any> {
    const url = `${this.geoApi}/postnummer?postnummerPrefix=${encodeURIComponent(prefix)}`;
    return new Promise((resolve, reject) => {
      this.http.get(url)
        .subscribe((data) => {
          resolve(data);
        }, (error: HttpErrorResponse) => {
          if (error.error instanceof Error) {
            // A client-side or network error occurred. Handle it accordingly.
            console.log('An error occurred:', error.error.message);
            reject(new Error(error.error.message));
          } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.log(this);
            console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
            reject(new Error(error.error.parameterViolations[0].message));
          }
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
