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
  showParttimeSlider: boolean;

  numberOfAvailableJobs: number;
  adsPageNumber: number;
  numberOfHitsPerPage: number;
  numberOfPages: number;

  yrkesomraden: Array<Yrkesomrade>;
  searchparameters: Array<Profilkriterium>;
  searchResult: Sokresultat;
  relatedCriteria: Array<RelateratKriterium>;

  someRange: number[] = [0, 100];
  constructor(private yrkenService: YrkenService, private pbapiMatchningService: PbapiMatchningService) {
    this.showTerms = this.showCompetences = this.showExperience = this.showLicences = this.showParttimeSlider = false;
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
  // toggleChild(e): void {
  //   const target = e.target || e.srcElement;
  //   const children = target.parentNode.parentNode.children;
  //   for (const child of children) {
  //     if (child.nodeName === 'UL') {
  //         child.classList.toggle('hidden');
  //     } else if (child.nodeName === 'DIV' && child.classList.contains('liContent')) {
  //       const grandChildren = child.children;
  //       for (const grandChild of grandChildren) {
  //         if (grandChild.classList.contains('collapsed')) {
  //           grandChild.classList.remove('collapsed');
  //           grandChild.classList.add('expanded');
  //         } else if (grandChild.classList.contains('expanded')) {
  //           grandChild.classList.add('collapsed');
  //           grandChild.classList.remove('expanded');
  //         } else if (grandChild.classList.contains('checkbox')) {
  //           grandChild.classList.toggle('checked');
  //         }
  //       }
  //     }
  //   }
  // }
  yrkesomradeCheck(e, id: string, name: string, type: string) {
    const target = e.target || e.srcElement;
    const children = document.querySelectorAll('[data-parent-id="' + type + '_' + id + '"]');
    if (!target.checked) {
      this.removeFromList(id, type);
    } else {
      this.addToList(id, name, type);
    }
    if (children.length) {
      for (let i = 0; i < children.length; ++i) {
        children[i]['checked'] = target.checked;
        if (target.checked) {
          this.removeFromList(children[i].getAttribute('data-id'), children[i].getAttribute('data-type'));
        }
        const grandChildren = document.querySelectorAll('[data-parent-id="' +
          children[i].getAttribute('data-type') + '_' + children[i].getAttribute('data-id') + '"]');
        if (grandChildren.length) {
          for (let j = 0; j < grandChildren.length; ++j) {
            grandChildren[j]['checked'] = target.checked;
            if (target.checked) {
              this.removeFromList(grandChildren[j].getAttribute('data-id'), grandChildren[j].getAttribute('data-type'));
            }
          }
        }
      }
    }
    this.search();
  }
  yrkesgruppCheck(e, id: string, name: string, type: string) {
    const target = e.target || e.srcElement;
    const children = document.querySelectorAll('[data-parent-id="' + type + '_' + id + '"]');
    console.log('children');
    if (children.length) {
      for (let i = 0; i < children.length; ++i) {
        children[i]['checked'] = target.checked;
        if (target.checked) {
          this.removeFromList(children[i].getAttribute('data-id'), children[i].getAttribute('data-type'));
        }
      }
    }
    const parentId = target.getAttribute('data-parent-id');
    const parent = document.getElementById(parentId);
    if (!target.checked) {
      parent['checked'] = false;
      this.removeFromListAndSearch(parent.getAttribute('data-id'), parent.getAttribute('data-type'));
      const siblings = document.querySelectorAll('[data-parent-id="' + parentId + '"]');
      if (siblings.length) {
        for (let i = 0; i < siblings.length; ++i) {
          if (siblings[i]['checked']) {
            this.addToList(siblings[i].getAttribute('data-id'),
              siblings[i].getAttribute('data-name'),
              siblings[i].getAttribute('data-type'));
          } else {
            this.removeFromList(siblings[i].getAttribute('data-id'),
              siblings[i].getAttribute('data-type'));
          }
        }
      }
    } else {
      // Check if all siblings are checked
      if (this.areAllSiblingsChecked(parentId)) {
        parent['checked'] = true;
        this.addToList(parent.getAttribute('data-id'), parent.getAttribute('data-name'), parent.getAttribute('data-type'));
        const siblings = document.querySelectorAll('[data-parent-id="' + parentId + '"]');
        if (siblings.length) {
          for (let i = 0; i < siblings.length; ++i) {
            if (siblings[i]['checked']) {
              this.removeFromList(siblings[i].getAttribute('data-id'),
                siblings[i].getAttribute('data-type'));
            }
          }
        }
      } else {
        const siblings = document.querySelectorAll('[data-parent-id="' + parentId + '"]');
        if (siblings.length) {
          for (let i = 0; i < siblings.length; ++i) {
            if (siblings[i]['checked']) {
              this.addToList(siblings[i].getAttribute('data-id'),
                siblings[i].getAttribute('data-name'),
                siblings[i].getAttribute('data-type'));
            }
          }
        }
      }
    }
  }
  yrkeCheck(e, id: string, name: string, type: string) {
    const target = e.target || e.srcElement;
    const parentId = target.getAttribute('data-parent-id');
    const parent = document.getElementById(parentId);
    const grandParentId = parent.getAttribute('data-parent-id');
    const grandParent = document.getElementById(grandParentId);
    const siblings = document.querySelectorAll('[data-parent-id="' + parentId + '"]');
    const parentSiblings = document.querySelectorAll('[data-parent-id="' + grandParentId + '"]');
    if (!target.checked) {
      parent['checked'] = false;
      if (!this.areAllSiblingsChecked(grandParentId)) {
        grandParent['checked'] = false;
        this.removeFromList(grandParent.getAttribute('data-id'), grandParent.getAttribute('data-type'));
      }
      if (siblings.length) {
        for (let i = 0; i < siblings.length; ++i) {
          if (siblings[i]['checked']) {
            this.addToList(siblings[i].getAttribute('data-id'),
              siblings[i].getAttribute('data-name'),
              siblings[i].getAttribute('data-type'));
          } else {
            this.removeFromList(siblings[i].getAttribute('data-id'),
              siblings[i].getAttribute('data-type'));
          }
        }
      }
      if (parentSiblings.length) {
        for (let i = 0; i < parentSiblings.length; ++i) {
          if (parentSiblings[i]['checked']) {
            this.addToList(parentSiblings[i].getAttribute('data-id'),
              parentSiblings[i].getAttribute('data-name'),
              parentSiblings[i].getAttribute('data-type'));
          } else {
            this.removeFromList(parentSiblings[i].getAttribute('data-id'),
              parentSiblings[i].getAttribute('data-type'));
          }
        }
      }
    } else {
      if (this.areAllSiblingsChecked(parentId)) {
        parent['checked'] = true;
        if (siblings.length) {
          for (let i = 0; i < siblings.length; ++i) {
            if (siblings[i]['checked']) {
              this.removeFromList(siblings[i].getAttribute('data-id'),
                siblings[i].getAttribute('data-type'));
            }
          }
        }
        if (this.areAllSiblingsChecked(grandParentId)) {
          grandParent['checked'] = true;
          this.addToList(grandParent.getAttribute('data-id'), grandParent.getAttribute('data-name'), grandParent.getAttribute('data-type'));
          for (let i = 0; i < parentSiblings.length; ++i) {
            this.removeFromList(parentSiblings[i].getAttribute('data-id'),
              parentSiblings[i].getAttribute('data-type'));
          }
        }
      } else {
        this.addToList(id, name, type);
      }
    }
  }
  areAllSiblingsChecked(parentId: string) {
    let allChecked = true;
    const siblings = document.querySelectorAll('[data-parent-id="' + parentId + '"]');
    if (siblings.length) {
      [].forEach.call(siblings, function(input) {
        if (!input.checked) {
          allChecked = false;
        }
      });
    }
    return allChecked;
  }
  toggleChild(e, id: string, name: string, type: string): void {
    const target = e.target || e.srcElement;
    console.log(target);
    const children = id + '_' + type + '_CHILDREN';
    console.log(children);
    const childContainer = document.getElementById(id + '_' + type + '_CHILDREN');
    if (target.classList.contains('collapsed')) {
      target.classList.remove('collapsed');
      target.classList.add('expanded');
      childContainer.classList.remove('hidden');
    } else if (target.classList.contains('expanded')) {
      target.classList.add('collapsed');
      target.classList.remove('expanded');
      childContainer.classList.add('hidden');
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
  addToList(id: string, name: string, type: string, toggle?: boolean) {
    if (type.toUpperCase() === 'YRKE') {
      type = 'YRKESROLL';
    } else if (type.toUpperCase() === 'YRKESGRUPP') {
      type = 'YRKESGRUPP_ROLL';
    } else if (type.toUpperCase() === 'YRKESOMRADE') {
      type = 'YRKESOMRADE_ROLL';
    }

    const found = this.searchparameters.some(function (el) {
      return el.varde === id && el.typ === type;
    });

    if (!found) {
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
    if (this.searchparameters.length > 0) {
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
  removeFromListAndUnselect(id: string, type: string) {
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
    } else if (type.toUpperCase() === 'ARBETSOMFATTNING') {
      if (id === 'Endast Heltid') {
        const elem = document.getElementById('villkor-heltid');
        elem['checked'] = false;
      } else {
        const elem = document.getElementById('villkor-deltid');
        elem['checked'] = false;
      }
    }
    this.removeFromListAndSearch(id, type);
  }
  removeFromListAndSearch(id: string, type: string) {
    this.removeFromList(id, type);
    if (this.searchparameters.length > 0) {
      this.search();
    }
  }
  removeFromList(id: string, type: string) {
    console.log(id + ' ' + type);
    if (type.toUpperCase() === 'YRKE') {
      type = 'YRKESROLL';
    } else if (type.toUpperCase() === 'YRKESGRUPP') {
      type = 'YRKESGRUPP_ROLL';
    } else if (type.toUpperCase() === 'YRKESOMRADE') {
      type = 'YRKESOMRADE_ROLL';
    }
    this.searchparameters = this.searchparameters.filter(item => !(item.varde === id && item.typ === type));
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
  checkboxPropertyClick(e, id: string, name: string, type: string) {
    const target = e.target || e.srcElement;
    console.log(e);
    console.log(target.checked);
    if (target.checked) {
      this.addToList(id, name, type);
    } else {
      this.removeFromListAndSearch(id, type);
    }
  }
  fulltimePropertyClick(e) {
    const target = e.target || e.srcElement;
    if (target.checked) {
      this.showParttimeSlider = false;
      const found = this.searchparameters.some(function (el) {
        return el.varde === 'Endast Heltid' && el.typ === 'ARBETSOMFATTNING';
      });
      if (!found) {
        this.searchparameters = this.searchparameters.filter(item => !(item.varde.includes('Deltid') && item.typ === 'ARBETSOMFATTNING'));
        const elem = document.getElementById('villkor-deltid');
        elem['checked'] = false;
        const kriterium = {
          'typ': 'ARBETSOMFATTNING',
          'varde': 'Endast Heltid',
          'namn': 'Endast Heltid',
          'egenskaper': [
            {
              'typ': 'ARBETSOMFATTNING_MIN',
              'varde': '100',
              'benamning': '100'
            },
            {
              'typ': 'ARBETSOMFATTNING_MAX',
              'varde': '100',
              'benamning': '100'
            }
          ]
        };
        this.searchparameters.push(kriterium);
        this.search();
      }
    } else {
      this.removeFromListAndUnselect('Endast Heltid', 'ARBETSOMFATTNING');
    }
  }
  parttimePropertyClick(e) {
    const target = e.target || e.srcElement;
    if (target.checked) {
      this.showParttimeSlider = true;
      this.removeFromListAndUnselect('Endast Heltid', 'ARBETSOMFATTNING');
      this.updateSearchParametersWithParttime();
    } else {
      this.showParttimeSlider = false;
      this.removeFromListAndUnselect('Deltid', 'ARBETSOMFATTNING');
    }
  }
  updateSearchParametersWithParttime() {
    let value = '';
    let name = '';
    if (this.someRange[1] === 100) {
      value = 'Heltid/Deltid ' + this.someRange[0] + '-100%';
    } else {
      value = 'Deltid ' + this.someRange[0] + '-' + this.someRange[1] + '%';
    }
    name = value;
    // this.removeFromListAndUnselect(value, 'ARBETSOMFATTNING');
    this.searchparameters = this.searchparameters.filter(item => !(item.varde.includes('Deltid') && item.typ === 'ARBETSOMFATTNING'));
    const kriterium = {
      'typ': 'ARBETSOMFATTNING',
      'varde': value,
      'namn': name,
      'egenskaper': [
        {
          'typ': 'ARBETSOMFATTNING_MIN',
          'varde': this.someRange[0].toString(),
          'benamning': this.someRange[0].toString()
        },
        {
          'typ': 'ARBETSOMFATTNING_MAX',
          'varde': this.someRange[1].toString(),
          'benamning': this.someRange[1].toString()
        }
      ]
    }
    this.searchparameters.push(kriterium);
    this.search();
  }
  rangeValueChanged(e) {
    this.updateSearchParametersWithParttime();
  }
}
