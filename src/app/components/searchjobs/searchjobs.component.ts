import { Component, OnInit } from '@angular/core';
import { YrkenService } from '../../services/yrken/yrken.service';
import { PbapiMatchningService } from '../../services//pbapi-matchning/pbapi-matchning.service';
import { Yrkesomrade } from '../../models/Yrkesomrade.interface';
// import { Searchparameter } from '../../models/Searchparameter.interface';
import { Profilkriterium } from '../../models/Profilkriterium.interface';
import { Sokresultat } from '../../models/Sokresultat.interface';
import { RelateratKriterium } from '../../models/Relateratkriterium.interface';

@Component({
  selector: 'app-searchjobs',
  templateUrl: './searchjobs.component.html',
  styleUrls: ['./searchjobs.component.scss'],
  providers: [
    YrkenService,
    PbapiMatchningService
  ]
})
export class SearchjobsComponent implements OnInit {

  showJobTypes: boolean;
  showJobGeoArea: boolean;
  showTerms: boolean;
  showCompetences: boolean;
  showExperience: boolean;
  showLicences: boolean;
  showJobAreas: boolean;
  showPreviousButton: boolean;
  showNextButton: boolean;
  listIsCompact = false;

  numberOfAvailableJobs: number;
  adsPageNumber: number;
  numberOfHitsPerPage: number;
  numberOfPages: number;

  yrkesomraden: Array<Yrkesomrade>;
  searchparameters: Array<Profilkriterium>;
  searchResult: Sokresultat;
  relatedCriteria: Array<RelateratKriterium>;
  constructor(private yrkenService: YrkenService, private pbapiMatchningService: PbapiMatchningService) {
    this.showTerms = this.showCompetences = this.showExperience = this.showLicences = false;
    this.showJobAreas = false;
    this.showPreviousButton = false;
    this.showNextButton = true;
    this.showJobTypes = this.showJobGeoArea = true;
    this.searchparameters = new Array<Profilkriterium>();
    this.relatedCriteria = new Array<RelateratKriterium>();
    this.searchResult = {
      rekryteringsbehov: [],
      relateradeKriterier: [],
      antalRekryteringsbehov: 0,
      antalRekryteringsbehovMatcharExakt: 0,
      antalRekryteringsbehovMatcharDelvis: 0,
      antalPlatser: 0,
      antalResultatRader: 0,
      guid: ''
    };
    this.adsPageNumber = this.numberOfPages = 0;
    this.numberOfHitsPerPage = 5;
    this.yrkenService.getLocalSelection().subscribe(yrkesomraden => {
        this.yrkesomraden = yrkesomraden;
    });
    this.pbapiMatchningService.getNumberOfAvailableJobs().then(data => {
      this.numberOfAvailableJobs = data;
    });
  }

  ngOnInit() {
  }

  formatJobTime(min: number, max: number) {
    if ((max === min) && (max === 100)) {
      return 'Heltid, ';
    } else if ((max === min) && (max !== 100)) {
      return 'Deltid (' + max + '%), ';
    } else {
      return 'Deltid (' + min + '% - ' + max + '%), ';
    }
  }
  toggleJobAreas (e) {
    this.showJobAreas = !this.showJobAreas;
    const target = e.target || e.srcElement;
    const children = target.parentNode.children;
    console.log(children);
    for (const child of children) {
      if (child.nodeName === 'DIV' && child.classList.contains('collapsed')) {
        child.classList.remove('collapsed');
        child.classList.add('expanded');
      } else if (child.nodeName === 'DIV' && child.classList.contains('expanded')) {
        child.classList.add('collapsed');
        child.classList.remove('expanded');
      }
    }
  }
  toggleChild(e): void {
    const target = e.target || e.srcElement;
    const children = target.parentNode.parentNode.children;
    for (const child of children) {
      if (child.nodeName === 'UL') {
          child.classList.toggle('hidden');
      } else if (child.nodeName === 'DIV' && child.classList.contains('liContent')) {
        const grandChildren = child.children;
        for (const grandChild of grandChildren) {
          if (grandChild.classList.contains('collapsed')) {
            grandChild.classList.remove('collapsed');
            grandChild.classList.add('expanded');
          } else if (grandChild.classList.contains('expanded')) {
            grandChild.classList.add('collapsed');
            grandChild.classList.remove('expanded');
          } else if (grandChild.classList.contains('checkbox')) {
            grandChild.classList.toggle('checked');
          }
        }
      }
    }
  }
  checkSelection(e): void {
    const target = e.target || e.srcElement;
    const children = target.parentNode.parentNode.children;
    for (const child of children) {
      if (child.nodeName === 'DIV' && child.classList.contains('liContent')) {
        const grandChildren = child.children;
        for (const grandChild of grandChildren) {
          if (grandChild.classList.contains('checkbox')) {
            grandChild.classList.toggle('checked');
          }
        }
      }
    }
  }
  addToList(id: number, name: string, type: string, toggle?: boolean) {
    const found = this.searchparameters.some(function (el) {
      return el.varde === id.toString();
    });

    if (!found) {
      if (type.toUpperCase() === 'YRKE') {
        type = 'YRKESROLL';
      } else if (type.toUpperCase() === 'YRKESGRUPP') {
        type = 'YRKESGRUPP_ROLL';
      } else if (type.toUpperCase() === 'YRKESOMRADE') {
        type = 'YRKESOMRADE_ROLL';
      }
      this.searchparameters.push({
        'typ': type,
        'varde': id.toString(),
        'namn': name
      });
      // this.selectItemInList(id);
      this.search();
    } else if (toggle) {
      this.removeFromList(id, type);
    }
  }
  search() {
    const offset = this.adsPageNumber * this.numberOfHitsPerPage;
    this.pbapiMatchningService.getMatchingAds(this.searchparameters, this.numberOfHitsPerPage, offset).then(data => {
      this.searchResult = data;
      console.log(this.searchResult);
      this.numberOfPages = Math.floor((this.searchResult.antalRekryteringsbehov / this.numberOfHitsPerPage) + 1);
      if ((this.adsPageNumber + 1) >= this.numberOfPages) {
        this.showNextButton = false;
      } else {
        this.showNextButton = true;
      }
    });
  }
  nextAdsPage() {
    this.adsPageNumber++;
    this.search();
  }
  previousAdsPage() {
    if (this.adsPageNumber > 0) {
      this.adsPageNumber--;
      this.search();
    }
  }
  selectItemInList(id: number) {
    const element = document.querySelectorAll('[data-id="' + id + '"]');
    const children = element[0].childNodes;
    for (let i = 0; i < children.length; i++) {
      const child: any = children[i];
      if (child.nodeName === 'DIV' && child.classList.contains('checkbox')) {
        child.classList.add('checked')
      }
    }
  }
  removeFromListAndUnselect(id: number, type: string) {
    const element = document.querySelectorAll('[data-id="' + id + '"]');
    if (element.length) {
      const children = element[0].childNodes;
      for (let i = 0; i < children.length; i++) {
        const child: any = children[i];
        if (child.nodeName === 'DIV' && child.classList.contains('checked')) {
          child.classList.remove('checked');
        }
      }
    }
    if (type.toUpperCase() === 'KORKORT') {
      const elem = document.getElementById('korkort_' + id);
      elem['checked'] = false;
    } else if (type.toUpperCase() === 'ANSTALLNINGSTYP') {
      const elem = document.getElementById('anstallningstyp-' + id);
      elem['checked'] = false;
    }
    this.removeFromList(id, type);
  }
  removeFromList(id: number, type: string) {
    this.searchparameters = this.searchparameters.filter(item => !(item.varde === id.toString() && item.typ === type));
    if (this.searchparameters.length > 0) {
      this.search();
    }
  }
  emptyList() {
    this.searchparameters.length = 0;
    const elements = document.getElementsByClassName('checkbox checked');
    console.log(elements.length);
    const children = new Array<any>();
    for (let i = 0; i < elements.length; i++) {
      const element: any = elements[i];
    }
    for (const child of children) {
      child.classList.remove('checked');
    }
  }

  formatDate(dateNumber: number) {
    const month = new Array(12);
    month[0] = 'januari'; month[1] = 'februari'; month[2] = 'mars';
    month[3] = 'april'; month[4] = 'maj'; month[5] = 'juni';
    month[6] = 'juli'; month[7] = 'augusti'; month[8] = 'september';
    month[9] = 'oktober'; month[10] = 'november'; month[11] = 'december';

    const date = new Date(dateNumber);
    return date.getDate() + ' ' + month[date.getMonth()] + ' '
            + date.getFullYear();
  }

  getDateString(dateNumber: number) {
    const date = new Date(dateNumber);
    const today = new Date();
    const dayMs = 24 * 60 * 60 * 1000;
    const tomorrow = new Date(today.getTime() + dayMs);
    const yesterday = new Date(today.getTime() - dayMs);

    if (tomorrow.getFullYear() === date.getFullYear()
        && tomorrow.getMonth() === date.getMonth()
        && tomorrow.getDate() === date.getDate()) {
      return 'tomorrow';
    } else if (today.getFullYear() === date.getFullYear()
                && today.getMonth() === date.getMonth()
                && today.getDate() === date.getDate()) {
      return 'today';
    } else if (yesterday.getFullYear() === date.getFullYear()
            && yesterday.getMonth() === date.getMonth()
            && yesterday.getDate() === date.getDate()) {
      return 'yesterday';
    } else {
      return 'other';
    }
  }

  getFormattedDate(dateNumber: number, includeTime?: boolean) {
    const day = this.getDateString(dateNumber);
    if (day === 'other') {
      return this.formatDate(dateNumber);
    } else if (day === 'today') {
        if (!includeTime) {
          return 'idag';
        } else {
          const time = new Date(dateNumber);
          return 'idag, ' + this.addZero(time.getHours()) + ':'
                  + this.addZero(time.getMinutes());
        }
    } else if (day === 'yesterday') {
        return 'igår';
    } else {
      return 'imorgon';
    }
  }

  addZero(i) {
    if (i < 10) {
        i = '0' + i;
    }
    return i;
  }

  isDateBeforeToday(date: number) {
    return new Date(new Date(date)) < new Date(new Date().toDateString());
  }

  isDateOver90DaysAgo(date: number) {
    const today = new Date();
    const expirationDate = new Date(date);
    expirationDate.setDate(expirationDate.getDate() + 9);
    return (today > expirationDate);
  }
  checkboxPropertyClick(e, id: number, name: string, type: string) {
    const target = e.target || e.srcElement;
    console.log(e);
    console.log(target.checked);
    if (target.checked) {
      this.addToList(id, name, type);
    } else {
      this.removeFromList(id, type);
    }
  }
}
