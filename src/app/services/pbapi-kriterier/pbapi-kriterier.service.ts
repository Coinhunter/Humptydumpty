import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { GlobalVariables } from '../../global';
import { Observable } from 'rxjs';
import { Profilkriterium } from '../../models/Profilkriterium';
import { ProfilkriteriumTyper } from '../../models/ProfilkriteriumTyper';
import { SynonymSearchResultDTO } from 'app/models/SynonymSearchResultDTO';
import { KriterieSearch } from 'app/models/KriterieSearch';

@Injectable()
export class PbapiKriterierService {
  private pbApi = GlobalVariables.PBAPI_URL;

  constructor(private httpClient: HttpClient) {}

  getJobbaIKriterier(filter: string):Observable<KriterieSearch> {
    const url = `${this.pbApi}/matchning/matchningskriterier?typer=kommuner&typer=lan&typer=lander&namnfilter=${filter}`;
    return this.httpClient.get<KriterieSearch>(url);
  }

  getJobbaSomKriterier(filter: string) {
    const url = `${this.pbApi}/matchning/matchningskriterierSynonym?typer=yrken&typer=yrkesgrupper&typer=yrkesomraden&namnfilter=${filter}`;
    return this.httpClient.get<KriterieSearch>(url);
  }  
}