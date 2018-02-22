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
  private yrkesHierarki;

  constructor(private httpClient: HttpClient) {}

  getJobbaIKriterier(filter: string):Observable<Array<Profilkriterium>> {
    const url = `${this.pbApi}/matchning/matchningskriterier?typer=kommuner&typer=lan&typer=lander&namnfilter=${filter}`;
    return this.httpClient.get<Array<Profilkriterium>>(url);
  }

  getJobbaSomKriterier(filter: string):Observable<KriterieSearch> {
    const url = `${this.pbApi}/matchning/matchningskriterierSynonym?typer=yrken&typer=yrkesgrupper&typer=yrkesomraden&namnfilter=${filter}`;
    return this.httpClient.get<KriterieSearch>(url);
  }

  getKorkortKriterier():Observable<Array<any>> {
    const url = `${this.pbApi}/matchning/matchningskriterier/korkort`;
    return this.httpClient.get<Array<any>>(url);
  }

  getAnstallningstypKriterier():Observable<Array<Profilkriterium>> {
    const url = `${this.pbApi}/matchning/matchningskriterier/anstallningstyper`;
    return this.httpClient.get<Array<Profilkriterium>>(url);
  }

  getYrkesStruktur() {
    return new Promise((resolve, reject) => {
      if (this.yrkesHierarki) {
        resolve(this.yrkesHierarki);
      } else {
        this.httpClient.get('./assets/yrken_all.json').subscribe((result) => {
          this.yrkesHierarki = this.buildHierarki(result);
          resolve(this.yrkesHierarki);
        });
      }  
    });
  }

  buildHierarki(data) {
    data.forEach((omrade) => {
      omrade.selected = false;
      omrade.partialSelect = false;
      omrade.open = false;
      omrade.yrkesgrupper.forEach((yrkesgrupp) => {
        yrkesgrupp.selected = false;
        yrkesgrupp.partialSelect = false;
        yrkesgrupp.open = false;
        yrkesgrupp.yrken.forEach((yrke) => {
          yrke.partialSelect = false;
          yrke.selected = false;
        });
        yrkesgrupp.children = yrkesgrupp.yrken;
        delete yrkesgrupp.yrken;
      });
      omrade.children = omrade.yrkesgrupper;
      delete omrade.yrkesgrupper;
    });
    return data;
  }
  
}