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
  private platsHierarki;

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
          this.yrkesHierarki = this.buildYrkesHierarki(result);
          resolve(this.yrkesHierarki);
        });
      }  
    });
  }

  getPlatsStruktur() {
    return new Promise((resolve, reject) => {
      if (this.platsHierarki) {
        resolve(this.platsHierarki)
      } else {
        this.httpClient.get('./assets/platser_all.json').subscribe((result) => {
          this.platsHierarki = this.buildPlatsHierarki(result);
          resolve(this.platsHierarki);
        });
      }
    });
  }

  buildPlatsHierarki(data) {
    data.forEach((land) => {
      land.selected = false;
      land.partialSelect = false;
      land.open = false;
      land.lan = land.lan || [];
      land.lan.forEach((l) => {
        l.selected = false;
        l.partialSelect = false;
        l.open = false;
        l.kommuner.forEach((kommun) => {
          kommun.selected = false;
          kommun.partialSelect = false;
        });
        l.children = l.kommuner;
        delete l.kommuner;
      });
      land.children = land.lan;
      delete land.lan;
    });
    return data;
  }

  buildYrkesHierarki(data) {
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