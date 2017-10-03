import { Component, OnInit } from '@angular/core';
import { YrkenService } from '../../services/yrken/yrken.service';
import { PbapiMatchningService } from '../../services//pbapi-matchning/pbapi-matchning.service';
import { Yrkesomrade } from '../../models/Yrkesomrade.interface';
// import { Searchparameter } from '../../models/Searchparameter.interface';
import { Profilkriterium } from '../../models/Profilkriterium.interface';
import { Sokresultat } from '../../models/Sokresultat.interface';
import { RelateratKriterium } from '../../models/RelateratKriterium.interface';

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
  levelOneCheck(e, id: string, name: string, type: string) {
    let target = e.target || e.srcElement;
    if (target == null) {
      if (type.toUpperCase() === 'YRKESOMRADE_ROLL') {
        type = 'YRKESOMRADE';
      }
      target = document.getElementById(type + '_' + id);
    }
    const label = document.getElementById(type + '_' + id + '_LABEL');
    const children = document.querySelectorAll('[data-parent-id="' + type + '_' + id + '"]');
    if (!target.checked) {
      this.removeFromList(id, type);
      this.removeHilightInList(id, type);
    } else {
      this.addToList(id, name, type);
      this.addHilightInList(id, type);
      label.classList.remove('minus');
    }
    if (children.length) {
      for (let i = 0; i < children.length; ++i) {
        children[i]['checked'] = target.checked;
        const childType = children[i].getAttribute('data-type');
        const childId = children[i].getAttribute('data-id');
        document.getElementById(childType + '_' + childId + '_LABEL').classList.remove('minus');
        if (target.checked) {
          this.removeFromList(childId, childType);
          this.removeHilightInList(childId, childType);
        }
        const grandChildren = document.querySelectorAll('[data-parent-id="' +
          children[i].getAttribute('data-type') + '_' + children[i].getAttribute('data-id') + '"]');
        if (grandChildren.length) {
          for (let j = 0; j < grandChildren.length; ++j) {
            grandChildren[j]['checked'] = target.checked;
            if (target.checked) {
              const grandChildId = grandChildren[j].getAttribute('data-id');
              const grandChildType = grandChildren[j].getAttribute('data-type');
              this.removeFromList(grandChildId, grandChildType);
              this.removeHilightInList(grandChildId, grandChildType);
            }
          }
        }
      }
    }
    this.search();
  }
  levelTwoCheck(e, id: string, name: string, type: string) {
    let target = e.target || e.srcElement;
    if (target == null) {
      if (type.toUpperCase() === 'YRKESGRUPP_ROLL') {
        type = 'YRKESGRUPP';
      }
      target = document.getElementById(type + '_' + id);
    }
    const children = document.querySelectorAll('[data-parent-id="' + type + '_' + id + '"]');
    const label = document.getElementById(type + '_' + id + '_LABEL');
    if (children.length) {
      for (let i = 0; i < children.length; ++i) {
        children[i]['checked'] = target.checked;
        if (target.checked) {
          const childType = children[i].getAttribute('data-type');
          const childId = children[i].getAttribute('data-id');
          this.removeFromList(childId, childType);
          this.removeHilightInList(childId, childType);
        }
      }
    }
    const parentTagId = target.getAttribute('data-parent-id');
    const parent = document.getElementById(parentTagId);
    const parentLabel = document.getElementById(parentTagId + '_LABEL');
    const parentId = parent.getAttribute('data-id');
    const parentName = parent.getAttribute('data-name');
    const parentType = parent.getAttribute('data-type');
    let siblingsChecked = false;
    if (!target.checked) {
      parent['checked'] = false;
      this.removeFromListAndSearch(parentId, parentType);
      this.removeHilightInList(parentId, parentType);
      const siblings = document.querySelectorAll('[data-parent-id="' + parentTagId + '"]');
      let siblingHasMinus = false;
      if (siblings.length) {
        for (let i = 0; i < siblings.length; ++i) {
          const siblingId = siblings[i].getAttribute('data-id');
          const siblingName = siblings[i].getAttribute('data-name');
          const siblingType = siblings[i].getAttribute('data-type');
          if (siblings[i]['checked']) {
            this.addToList(siblingId,
              siblingName,
              siblingType);
              siblingsChecked = true
            this.addHilightInList(siblingId, siblingType);
          } else {
            this.removeFromList(siblingId, siblingType);
            this.removeHilightInList(siblingId, siblingType);
            const siblingLabel = document.getElementById(
              siblingType + '_' + siblingId + '_LABEL');
            if (siblingLabel.classList.contains('minus')) {
              siblingHasMinus = true;
            }
          }
        }
        if (siblingsChecked) {
          parentLabel.classList.add('minus');
        } else {
          if (!siblingHasMinus) {
            parentLabel.classList.remove('minus');
          }
        }
      }
    } else {
      // Check if all siblings are checked
      label.classList.remove('minus');
      if (this.areAllSiblingsChecked(parentTagId)) {
        parent['checked'] = true;
        parentLabel.classList.remove('minus');
        this.addToList(parentId, parentName, parentType);
        this.addHilightInList(parentId, parentType);
        const siblings = document.querySelectorAll('[data-parent-id="' + parentTagId + '"]');
        if (siblings.length) {
          for (let i = 0; i < siblings.length; ++i) {
            if (siblings[i]['checked']) {
              const siblingId = siblings[i].getAttribute('data-id');
              const siblingType = siblings[i].getAttribute('data-type');
              this.removeFromList(siblingId, siblingType);
              this.removeHilightInList(siblingId, siblingType);
            }
          }
        }
      } else {
        parentLabel.classList.add('minus');
        const siblings = document.querySelectorAll('[data-parent-id="' + parentTagId + '"]');
        if (siblings.length) {
          for (let i = 0; i < siblings.length; ++i) {
            if (siblings[i]['checked']) {
              const siblingId = siblings[i].getAttribute('data-id');
              const siblingName = siblings[i].getAttribute('data-name');
              const siblingType = siblings[i].getAttribute('data-type');
              this.addToList(siblingId, siblingName, siblingType);
              this.addHilightInList(siblingId, siblingType);
            }
          }
        }
      }
    }
  }
  levelThreeCheck(e, id: string, name: string, type: string) {
    let target = e.target || e.srcElement;
    if (target == null) {
      if (type.toUpperCase() === 'YRKESROLL') {
        type = 'YRKE';
      }
      target = document.getElementById(type + '_' + id);
    }
    const parentTagId = target.getAttribute('data-parent-id');
    const parent = document.getElementById(parentTagId);
    const parentLabel = document.getElementById(parentTagId + '_LABEL');
    const parentId = parent.getAttribute('data-id');
    const parentName = parent.getAttribute('data-name');
    const parentType = parent.getAttribute('data-type');
    const grandParentTagId = parent.getAttribute('data-parent-id');
    const grandParent = document.getElementById(grandParentTagId);
    const grandParentLabel = document.getElementById(grandParentTagId + '_LABEL');
    const grandParentId = grandParent.getAttribute('data-id');
    const grandParentName = grandParent.getAttribute('data-name');
    const grandParentType = grandParent.getAttribute('data-type');
    const siblings = document.querySelectorAll('[data-parent-id="' + parentTagId + '"]');
    const parentSiblings = document.querySelectorAll('[data-parent-id="' + grandParentTagId + '"]');
    let siblingChecked = false;
    if (!target.checked) {
      parent['checked'] = false;
      if (!this.areAllSiblingsChecked(grandParentTagId)) {
        grandParent['checked'] = false;
        this.removeFromList(grandParentId, grandParentType);
        this.removeHilightInList(grandParentId, grandParentType);
      }
      if (siblings.length) {
        for (let i = 0; i < siblings.length; ++i) {
          const siblingId = siblings[i].getAttribute('data-id');
          const siblingName = siblings[i].getAttribute('data-name');
          const siblingType = siblings[i].getAttribute('data-type');
          if (siblings[i]['checked']) {
            this.addToList(siblingId, siblingName, siblingType);
            this.addHilightInList(siblingId, siblingType);
            siblingChecked = true;
          } else {
            this.removeFromList(siblingId, siblingType);
            this.removeHilightInList(siblingId, siblingType);
          }
        }
        if (siblingChecked) {
          parentLabel.classList.add('minus');
        } else {
          parentLabel.classList.remove('minus');
        }
      }
      if (parentSiblings.length) {
        let parentSiblingChecked = false;
        for (let i = 0; i < parentSiblings.length; ++i) {
          const parentSiblingId = parentSiblings[i].getAttribute('data-id');
          const parentSiblingName = parentSiblings[i].getAttribute('data-name');
          const parentSiblingType = parentSiblings[i].getAttribute('data-type');
          if (parentSiblings[i]['checked']) {
            this.addToList(parentSiblingId, parentSiblingName, parentSiblingType);
            this.addHilightInList(parentSiblingId, parentSiblingType);
            parentSiblingChecked = true;
          } else {
            this.removeFromList(parentSiblingId, parentSiblingType);
            this.removeHilightInList(parentSiblingId, parentSiblingType);
          }
        }
        if (parentSiblingChecked) {
          grandParentLabel.classList.add('minus');
        } else {
          if (!siblingChecked) {
            grandParentLabel.classList.remove('minus');
          }
        }
      }
    } else {
      if (this.areAllSiblingsChecked(parentTagId)) {
        parent['checked'] = true;
        parentLabel.classList.remove('minus');
        this.addToList(parentId, parentName, parentType);
        this.addHilightInList(parentId, parentType);
        if (siblings.length) {
          for (let i = 0; i < siblings.length; ++i) {
            if (siblings[i]['checked']) {
              const siblingId = siblings[i].getAttribute('data-id');
              const siblingType = siblings[i].getAttribute('data-type');
              this.removeFromList(siblingId, siblingType);
              this.removeHilightInList(siblingId, siblingType);
            }
          }
        }
        if (this.areAllSiblingsChecked(grandParentTagId)) {
          grandParent['checked'] = true;
          grandParentLabel.classList.remove('minus');
          this.addToList(grandParentId, grandParentName, grandParentType);
          this.addHilightInList(grandParentId, grandParentType);
          for (let i = 0; i < parentSiblings.length; ++i) {
            const parentSiblingId = parentSiblings[i].getAttribute('data-id');
            const parentSiblingType = parentSiblings[i].getAttribute('data-type');
            this.removeFromList(parentSiblingId, parentSiblingType);
            this.removeHilightInList(parentSiblingId, parentSiblingType);
          }
        } else {
          for (let i = 0; i < parentSiblings.length; ++i) {
            if (parentSiblings[i]['checked']) {
              grandParentLabel.classList.add('minus');
            }
          }
        }
      } else {
        this.addToList(id, name, type);
        this.addHilightInList(id, type);
        if (siblings.length) {
          for (let i = 0; i < siblings.length; ++i) {
            if (siblings[i]['checked']) {
              parentLabel.classList.add('minus');
            }
          }
        }
        grandParentLabel.classList.add('minus');
      }
    }
  }
  addHilightInList(id: string, type: string) {
    document.getElementById(type + '_' + id + '_CONTAINER').classList.add('hilight');
  }
  removeHilightInList(id: string, type: string) {
    document.getElementById(type + '_' + id + '_CONTAINER').classList.remove('hilight');
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
    const children = id + '_' + type + '_CHILDREN';
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
  removeFromListAndUnselect(id: string, name: string, type: string) {
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
    } else if (type.toUpperCase() === 'YRKESOMRADE_ROLL') {
      const elem = document.getElementById('YRKESOMRADE_' + id);
      elem['checked'] = false;
      this.levelOneCheck(elem, id, name, type);
    } else if (type.toUpperCase() === 'YRKESGRUPP_ROLL') {
      const elem = document.getElementById('YRKESGRUPP_' + id);
      elem['checked'] = false;
      this.levelTwoCheck(elem, id, name, type);
    } else if (type.toUpperCase() === 'YRKESROLL') {
      const elem = document.getElementById('YRKE_' + id);
      elem['checked'] = false;
      this.levelThreeCheck(elem, id, name, type);
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
      this.removeFromListAndUnselect('Endast Heltid', '', 'ARBETSOMFATTNING');
    }
  }
  parttimePropertyClick(e) {
    const target = e.target || e.srcElement;
    if (target.checked) {
      this.showParttimeSlider = true;
      this.removeFromListAndUnselect('Endast Heltid', '', 'ARBETSOMFATTNING');
      this.updateSearchParametersWithParttime();
    } else {
      this.showParttimeSlider = false;
      this.removeFromListAndUnselect('Deltid', '', 'ARBETSOMFATTNING');
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
