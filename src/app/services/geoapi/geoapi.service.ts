import { NgModule } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { GlobalVariables } from '../../global';
import { Observable } from 'rxjs';
import { Profilkriterium } from '../../models/Profilkriterium';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
})
@Injectable()
export class GeoapiService {
  private geoApi = GlobalVariables.GEOAPI_URL;

  constructor(private httpClient: HttpClient) { }

  getOrtByPostnummer(prefix: string): Observable<any> {
    const url = `${this.geoApi}/postnummer?postnummerPrefix=${encodeURIComponent(prefix)}`;
    return this.httpClient.get(url);
  }

  /*
  getAdresser(prefix:string): Observable<any> {
    const url = `${this.geoApi}/postnummer?postnummerPrefix=${encodeURIComponent(prefix)}`;
    return this.httpClient.get(url);
  }
  */

}
