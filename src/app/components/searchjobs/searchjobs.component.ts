import { Component, OnInit, HostListener } from '@angular/core';
import { YrkenService } from '../../services/yrken/yrken.service';
import { LanderService } from '../../services/lander/lander.service';
import { PbapiMatchningService } from '../../services//pbapi-matchning/pbapi-matchning.service';
import { FreetextSearchService } from '../../services/freetext-search/freetext-search.service';
import { CommonVariablesService } from '../../services/common-variables/common-variables.service';
import { AdService } from '../../services/ad/ad.service';
import { Yrkesomrade } from '../../models/Yrkesomrade.interface';
import { Land } from '../../models/Land.interface';
// import { Searchparameter } from '../../models/Searchparameter.interface';
import { Profilkriterium } from '../../models/Profilkriterium.interface';
import { Sokresultat } from '../../models/Sokresultat.interface';
import { RelateratKriterium } from '../../models/RelateratKriterium.interface';
import { Postnummer } from '../../models/Postnummer.interface';
import { Fritextsokresultat } from '../../models/Fritextsokresultat.interface';
import { Job } from '../../types/job.type';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-searchjobs',
  templateUrl: './searchjobs.component.html',
  styleUrls: ['./searchjobs.component.scss'],
  providers: [
    YrkenService,
    PbapiMatchningService,
    LanderService,
    FreetextSearchService
  ]
})
export class SearchjobsComponent implements OnInit {

  // get isLoggedIn(): boolean {
  //   return this.commonVariablesService.isLoggedIn;
  // }
  // set isLoggedIn(value: boolean) {
  //   this.commonVariablesService.isLoggedIn = value;
  // }

  showJobTypes: boolean;
  showJobGeoArea: boolean;
  showTerms: boolean;
  showCompetences: boolean;
  showExperience: boolean;
  showLicences: boolean;
  showJobAreas: boolean;
  showLandAreas: boolean;
  showSearchCriteria: boolean;
  showFreetextJobSearchResults: boolean;
  showFreetextAreaSearchResults: boolean;
  showPreviousButton: boolean;
  showNextButton: boolean;
  listIsCompact = false;
  showParttimeSlider: boolean;

  numberOfAvailableJobs: number;
  adsPageNumber: number;
  numberOfHitsPerPage: number;
  numberOfPages: number;

  freetextJob: string;
  freetextArea: string;

  yrkesomraden: Array<Yrkesomrade>;
  lander: Array<Land>;
  searchparameters: Array<Profilkriterium>;
  searchResult: Sokresultat;
  relatedCriteria: Array<RelateratKriterium>;
  freetextJobSearchResults: Array<Fritextsokresultat>;
  freetextAreaSearchResults: Array<Fritextsokresultat>;

  searchTimeout = null;

  someRange: number[] = [0, 100];

  showAlternativeListDesign = false;

  isLoggedInTest = false;
  isLoggedIn: boolean;

  kategorierOrder: Array<string>;

  currentJob: Job;

  constructor(private yrkenService: YrkenService,
    private landerService: LanderService, private pbapiMatchningService: PbapiMatchningService,
    private freetextSearchService: FreetextSearchService, private commonVariablesService: CommonVariablesService,
    private adService: AdService) {
    this.showTerms = this.showCompetences = this.showExperience = this.showLicences = this.showParttimeSlider = false;
    this.showJobAreas = this.showLandAreas = false;
    this.showFreetextJobSearchResults = this.showFreetextAreaSearchResults = false;
    this.showPreviousButton = false;
    this.showNextButton = true;
    this.showSearchCriteria = true;
    this.showJobTypes = this.showJobGeoArea = true;
    this.showAlternativeListDesign = false;
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
    this.numberOfHitsPerPage = 25;
    this.yrkenService.getLocalSelection().subscribe(yrkesomraden => {
        this.yrkesomraden = yrkesomraden;
    });
    this.landerService.getLocalSelection().subscribe(lander => {
        this.lander = lander;
    });

    this.kategorierOrder = ['YRKESOMRADE_ROLL', 'YRKESOMRADE', 'YRKESGRUPP_ROLL', 'YRKESGRUPP', 'YRKESROLL', 'YRKE', 'FRITEXT'];
  }

  ngOnInit() {
    this.commonVariablesService.isloggedIn.subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn);
    this.commonVariablesService.changeLoggedIn(false);
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

  @HostListener('document:click', ['$event'])
  public documentClick(event: Event): void {
    const target = <HTMLElement>event.target;
    if (target['id'] === 'mp-yrkesroller' ||
      target.getAttribute('data-type-name') === 'freetextJobOption' ||
      target.parentElement.getAttribute('data-type-name') === 'freetextJobOption' ) {
      this.showFreetextAreaSearchResults = false;
      const inputText = document.getElementById('mp-yrkesroller')['value'];
      if (this.freetextJobSearchResults && this.freetextJobSearchResults.length && inputText.length > 0) {
        this.showFreetextJobSearchResults = true;
      } else {
        this.showFreetextJobSearchResults = false;
      }
    } else if (target['id'] === 'mp-arbetsorter' ||
      target.getAttribute('data-type-name') === 'freetextAreaOption' ||
      target.parentElement.getAttribute('data-type-name') === 'freetextAreaOption' ) {
      this.showFreetextJobSearchResults = false;
      const inputText = document.getElementById('mp-arbetsorter')['value'];
      if (this.freetextAreaSearchResults && this.freetextAreaSearchResults.length && inputText.length > 0) {
        this.showFreetextAreaSearchResults = true;
      } else {
        this.showFreetextAreaSearchResults = false;
      }
    } else {
      this.showFreetextJobSearchResults = false;
      this.showFreetextAreaSearchResults = false;
    }
  }

  getAdById(id: string) {
    this.adService.getMatchingAdById(id, this.searchparameters).then(annons => {
        this.currentJob = annons;
        console.log(this.currentJob);
    });
  }

  getFreetextJobResults(freetext: string) {
    this.freetextSearchService.getMatchingJobs(freetext).then(yrken => {
        this.freetextJobSearchResults = yrken;
        this.freetextSearchService.getMatchingJobGroups(freetext).then(yrkesgrupper => {
          this.freetextJobSearchResults = this.freetextJobSearchResults.concat(yrkesgrupper);
          this.freetextSearchService.getMatchingJobAreas(freetext).then(yrkesomraden => {
            this.freetextJobSearchResults = this.freetextJobSearchResults.concat(yrkesomraden);
            this.freetextJobSearchResults = this.sortMatchningskriterierYrkesroller(this.freetextJobSearchResults, freetext);
            const exists = this.freetextJobSearchResults.some(function (el) {
              return el.namn.toLowerCase() === freetext.toLowerCase();
            });
            if (!exists) {
              this.freetextJobSearchResults.unshift({
                id: freetext,
                namn: freetext,
                typ: 'FRITEXT'
              });
            }
          });
        });
    });
  }

  sortMatchningskriterierYrkesroller(response, filter) {
    const lowerCaseFilter = filter.toLowerCase();
    const result = response.sort((a, b) => {
      const compareResult = a.namn.toLowerCase().indexOf(lowerCaseFilter) - b.namn.toLowerCase().indexOf(lowerCaseFilter);
      if (compareResult === 0) {
        return this.kategoriComparator(a, b);
      }
      return compareResult;
    });
    return result;
  }

  kategoriComparator(a, b) {
    // Specialfall för att vi är mongo som skiljer på de här kategorierna..
    if (a.typ === 'YRKESOMRADE_ROLL' && b.typ === 'YRKESOMRADE' || b.typ === 'YRKESOMRADE_ROLL' && a.typ === 'YRKESOMRADE') {
      return 0;
    } else if (a.typ === 'YRKESGRUPP_ROLL' && b.typ === 'YRKESGRUPP' || b.typ === 'YRKESGRUPP_ROLL' && a.typ === 'YRKESGRUPP') {
      return 0;
    } else if (a.typ === 'YRKESROLL' && b.typ === 'YRKE' || b.typ === 'YRKESROLL' && a.typ === 'YRKE') {
      return 0;
    } else {
      return this.kategorierOrder.indexOf(a.typ) - this.kategorierOrder.indexOf(b.typ);
    }
  }

  fritextToTop(result) {
    // Om vi bara har ett resultat ska vi inte göra detta eftersom det då är perfect match.
    if (result.length > 1) {
      const fritext = result.find(this.findFritext);
      if (fritext) { // Gör bara detta om vi hittar fritext (om vi träffat rätt kommer det inte finnas med..)
        result.splice(result.indexOf(fritext), 1);
        result.unshift(fritext);
      }
    }
    return result;
  }

  findFritext(fruit) {
    return fruit.typ === 'FRITEXT';
  }

  getFreetextAreaResults(freetext: string) {
    const lowerCaseFilter = freetext.toLowerCase();
    if (!parseInt(freetext, 10)) {
      this.freetextSearchService.getMatchingMuncipalities(freetext).then(kommuner => {
        this.freetextAreaSearchResults = kommuner;
        this.freetextSearchService.getMatchingCounties(freetext).then(lan => {
          this.freetextAreaSearchResults = this.freetextAreaSearchResults.concat(lan);
          this.freetextSearchService.getMatchingCountries(freetext).then(land => {
            this.freetextAreaSearchResults = this.freetextAreaSearchResults.concat(land);
            this.freetextAreaSearchResults.sort((a, b) => {
              return a.namn.toLowerCase().indexOf(lowerCaseFilter) - b.namn.toLowerCase().indexOf(lowerCaseFilter);
            });
          });
        });
      });
    } else if (freetext.length > 2) {
      this.freetextSearchService.getMatchingPostalCodes(freetext).then(koder => {
        const self = this;
        this.freetextAreaSearchResults = koder.map(function(item, index){
          const result = {
            'typ': 'GEOADRESS',
            'id': [item.postnummer, item.ortnamn].join(', '),
            'namn': [item.postnummer, item.ortnamn].join(', '),
            'egenskaper': [
              {
                'typ': 'LATITUD',
                'varde': item.koordinater.WGS84.y
              },
              {
                'typ': 'LONGITUD',
                'varde': item.koordinater.WGS84.x
              },
              {
                'typ': 'RADIE',
                'varde': '5'
              }
            ]
          }
          return result;
        });
      });
      this.freetextAreaSearchResults.sort((a, b) => {
        return a.namn.toLowerCase().indexOf(lowerCaseFilter) - b.namn.toLowerCase().indexOf(lowerCaseFilter);
      });
    }
  }

  highlightText(text: string, value: string) {
    const re = new RegExp(value, 'gi'); // 'gi' for case insensitive and can use 'g' if you want the search to be case sensitive.
    return text.replace(re, function (match) {
      return '<strong>' + match + '</strong>'  ;
    });
  }

  selectFreetextResult(e, id: string, name: string, type: string, category: string) {
    // console.log('Add to list: ' + id + ', ' + name + ', ' + type);

    if (category === 'job') {
      this.showFreetextJobSearchResults = false;
      this.freetextJobSearchResults.length = 0;
      document.getElementById('mp-yrkesroller')['value'] = '';
    } else if (category === 'area') {
      this.showFreetextAreaSearchResults = false;
      this.freetextAreaSearchResults.length = 0;
      document.getElementById('mp-arbetsorter')['value'] = '';
    }

    let target = null;
    if (type !== 'GEOADRESS') {
      if (type.toLowerCase() === 'yrkesroll') {
        type = 'YRKE';
      }
      this.addToList(id, name, type);
      target = document.getElementById(type + '_' + id);
    } else {
      const geoAddress = this.freetextAreaSearchResults.find( function (address) {
        return address.id === id;
      });
      this.addGeoaddressToList(geoAddress);
    }
    // this.freetextSearchResults = this.freetextSearchResults.filter(item => !(item.id.toString() === id && item.typ === type));
    if (target !== null) {
      target['checked'] = true;
      if (type.toLowerCase() === 'yrke' ||
          type.toLowerCase() === 'kommun') {
        this.levelThreeCheck(null, id, name, type);
      } else if (type.toLowerCase() === 'yrkesgrupp' ||
                  type.toLowerCase() === 'lan') {
        this.levelTwoCheck(null, id, name, type);
      } else if (type.toLowerCase() === 'yrkesomrade' ||
                  type.toLowerCase() === 'lan') {
        this.levelOneCheck(null, id, name, type);
      }
    }
  }

  addGeoaddressToList(address: Fritextsokresultat) {
    if (address !== null) {
      const found = this.searchparameters.some(function (el) {
        return el.varde === address.id && el.typ === address.typ;
      });

      if (!found) {
        this.searchparameters.push({
          'typ': address.typ,
          'varde': address.id,
          'namn': address.namn,
          'egenskaper': address.egenskaper
        });
        this.search();
      }
    }
  }

  onPostalCodeDistanceChange(value: string, parameter: Profilkriterium) {
    parameter.egenskaper.find( function (egenskap) {
      return egenskap.typ.toLowerCase() === 'radie';
    }).varde = value;
    this.search();
  }

  searchInputTimeout (e) {
    const target = e.target || e.srcElement;
    const value = target.value;
    clearTimeout(this.searchTimeout);
    const self = this;
    this.searchTimeout = setTimeout(function () {
      if (value.length > 0) {
        const id = target['id'];
        if (id === 'mp-yrkesroller') {
          self.showFreetextJobSearchResults = true;
          self.freetextJob = value;
          self.getFreetextJobResults(value);
        } else if (id === 'mp-arbetsorter') {
          self.showFreetextAreaSearchResults = true;
          self.freetextArea = value;
          self.getFreetextAreaResults(value);
        }
      } else {
        self.showFreetextJobSearchResults = false;
        self.showFreetextAreaSearchResults = false;
      }
    }, 300);
  }

  levelOneCheck(e, id: string, name: string, type: string) {
    let target;
    if (e != null) {
      target = e.target || e.srcElement;
    }
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
    // this.search();
  }
  levelTwoCheck(e, id: string, name: string, type: string) {
    let target;
    if (e != null) {
      target = e.target || e.srcElement;
    }
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
        this.addToList(parentId, parentName, parentType);
        this.addHilightInList(parentId, parentType);
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
    let target;
    if (e != null) {
      target = e.target || e.srcElement;
    }
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
          for (let i = 0; i < parentSiblings.length; ++i) {
            const parentSiblingId = parentSiblings[i].getAttribute('data-id');
            const parentSiblingType = parentSiblings[i].getAttribute('data-type');
            this.removeFromList(parentSiblingId, parentSiblingType);
            this.removeHilightInList(parentSiblingId, parentSiblingType);
          }
          this.addToList(grandParentId, grandParentName, grandParentType);
          this.addHilightInList(grandParentId, grandParentType);
        } else {
          this.addToList(parentId, parentName, parentType);
          this.addHilightInList(parentId, parentType);
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
    let target;
    if (e != null) {
      target = e.target || e.srcElement;
    }
    if (target == null) {
      const targetid = type + '_' + id + '_TOGGLE';
      target = document.getElementById(targetid);
    }
    const children = id + '_' + type + '_CHILDREN';
    const childContainer = document.getElementById(id + '_' + type + '_CHILDREN');
    const label = document.getElementById(type + '_' + id + '_LABEL');
    if (target.classList.contains('collapsed')) {
      target.classList.remove('collapsed');
      target.classList.add('expanded');
      childContainer.classList.remove('hidden');
      label.classList.add('bold');
    } else if (target.classList.contains('expanded')) {
      target.classList.add('collapsed');
      target.classList.remove('expanded');
      childContainer.classList.add('hidden');
      label.classList.remove('bold');
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
      console.log(this.searchparameters);
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
  removeFromListAndUnselect(id: string, name: string, type: string, skipSearch?: boolean) {
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
    } else if (type.toUpperCase() === 'INGEN_EFTERFRAGAD_YRKESERFARENHET') {
      const elem = document.getElementById('ingen-erfarenhet');
      elem['checked'] = false;
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
    } else if (type.toUpperCase() === 'LAND') {
      const elem = document.getElementById('LAND_' + id);
      elem['checked'] = false;
      this.levelOneCheck(elem, id, name, type);
    } else if (type.toUpperCase() === 'LAN') {
      const elem = document.getElementById('LAN_' + id);
      elem['checked'] = false;
      if (id !== '00') {
        this.levelOneCheck(elem, id, name, type);
      } else {
        this.levelOneCheck(elem, id, name, type);
      }
    } else if (type.toUpperCase() === 'KOMMUN') {
      const elem = document.getElementById('KOMMUN_' + id);
      elem['checked'] = false;
      this.levelTwoCheck(elem, id, name, type);
    }
    if (!skipSearch) {
      this.removeFromListAndSearch(id, type);
    }
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
    const elements = document.getElementsByClassName('checkbox checked');
    const children = new Array<any>();
    for (let i = 0; i < elements.length; i++) {
      const element: any = elements[i];
    }
    for (const child of children) {
      child.classList.remove('checked');
    }
    for (const parameter of this.searchparameters) {
      this.removeFromListAndUnselect(parameter.varde, parameter.namn, parameter.typ, true);
    }
    this.searchparameters.length = 0;
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

  topFunction() {
      document.body.scrollTop = 0; // For Chrome, Safari and Opera
      document.documentElement.scrollTop = 0; // For IE and Firefox
  }
}
