import { Component, OnInit } from '@angular/core';

import { PbapiKriterierService } from '../../services/pbapi-kriterier/pbapi-kriterier.service';
import { PbapiMatchningService } from '../../services/pbapi-matchning/pbapi-matchning.service';
import { UtilService } from '../../services/util/util.service';

import { Profilkriterium } from 'app/models/Profilkriterium';
import { HttpClient } from '@angular/common/http';
import { SynonymSearchResultDTO } from 'app/models/SynonymSearchResultDTO';
import { SelectedCriteriaService } from 'app/services/selected-criteria/selected-criteria.service';


@Component({
  selector: 'app-component-search',
  templateUrl: './component-search.component.html',
  styleUrls: ['./component-search.component.scss'],
  providers: [ PbapiKriterierService, PbapiMatchningService ],
})
export class ComponentSearchComponent implements OnInit {

  antalLedigaJobb: string;

  // Toggle list popover
  showPickFromList: boolean = false;

  // Yrken, yrkesgrupper, yrkesområden..
  showYrkenCriteria: boolean = false;
  valYrken: Profilkriterium;
  yrkenResults: Array<Profilkriterium>;
  chosenYrken: Array<Profilkriterium> = [];
  yrkenTimeout: any;
  yrkenBlurTimeout: any;

  // Orter, kommun, länder..
  showOrterCriteria: boolean = false;
  valOrter: Profilkriterium;
  orterResults: Array<Profilkriterium>;
  chosenOrter: Array<Profilkriterium> = [];
  orterTimeout: any;
  orterBlurTimeout: any;

  constructor(private pbKriterier: PbapiKriterierService,
      private pbMatchning: PbapiMatchningService,
      private util: UtilService,
      private selectedKriterier: SelectedCriteriaService) {}

  toggleShowPickFromList($event) {
    this.showPickFromList = !this.showPickFromList;
  }

  searchYrken(event) {
    this.yrkenResults = [];
    this.yrkenResults.push(new Profilkriterium(event.query, event.query, 'fritext'));

    this.pbKriterier.getJobbaSomKriterier(event.query).subscribe((data) => {
      data.matchningskriteriumList.slice(0,5).forEach((kriterium) => {
        kriterium.typ = kriterium.typ.toLowerCase();
        this.yrkenResults.push(kriterium);
      });
    });
  }

  searchOrter(event) {
    this.orterResults = [];
    this.orterResults.push(new Profilkriterium(event.query, event.query, 'fritext'));
    this.pbKriterier.getJobbaIKriterier(event.query).subscribe((data) => {
      data.slice(0,5).forEach((kriterium) => {
        kriterium.typ = kriterium.typ.toLowerCase();
        this.orterResults.push(kriterium);
      });
    });
  }

  yrkenAddValue(value) {
    this.yrkenPushChoosenValue(value);
    this.valYrken = undefined;
    this.focusYrkenSearchInput();
  }
  yrkenPushChoosenValue(value) {
    // Avoid adding the same thing multiple times.
    const found = this.chosenYrken.find((profilkriterium) => {
      return profilkriterium.varde === value.id;
    });

    if (!found) {
      this.chosenYrken.push(new Profilkriterium(value.id, value.namn, value.typ));
    }

    // Update service values.
    this.selectedKriterier.setSelectedYrkesKriterier(this.chosenYrken);
  }

  orterAddValue(value) {
    this.orterPushChoosenValue(value);
    this.valOrter = undefined;
    this.focusOrterSearchInput();
  }
  orterPushChoosenValue(value) {
    // Avoid adding the same thing multiple times.
    const found = this.chosenOrter.find((profilkriterium) => {
      return profilkriterium.varde === value.id;
    });

    if (!found) {
      this.chosenOrter.push(new Profilkriterium(value.id, value.namn, value.typ));
    }

    this.selectedKriterier.setSelectedPlatsKriterier(this.chosenOrter);

  }

  removeFromChosenYrken() {
    this.focusYrkenSearchInput();
    /*
    if (this.chosenYrken.length > 1) {
      this.focusYrkenSearchInput();
    } else {
      this.removeYrkenCriteria(this.chosenYrken[0]);
      this.focusYrkenSearchInput();
    }
    */
    this.selectedKriterier.setSelectedYrkesKriterier(this.chosenYrken);
  }

  removeFromChosenOrter() {
    this.focusOrterSearchInput();
    /*
    if (this.chosenOrter.length > 1) {
      this.focusOrterSearchInput();
    } else {
      this.removeYrkenCriteria(this.chosenOrter[0]);
      this.focusOrterSearchInput();
    }
    */
    this.selectedKriterier.setSelectedPlatsKriterier(this.chosenOrter);
  }

  focusYrkenSearchInput() {
    document.getElementById('search-yrken').getElementsByTagName("input")[0].focus();
  }

  focusOrterSearchInput() {
    document.getElementById('search-orter').getElementsByTagName("input")[0].focus();
  }

  removeYrkenCriteria(profilkriterium) {
    console.log('Removing: ', profilkriterium)
    const index = this.chosenYrken.indexOf(profilkriterium);
    if (index > -1) {
      this.chosenYrken.splice(index, 1);
    }
    clearTimeout(this.yrkenTimeout);
  }

  removeOrterCriteria(profilkriterium) {
    const index = this.chosenOrter.indexOf(profilkriterium);
    if (index > -1) {
      this.chosenOrter.splice(index, 1);
    }
    clearTimeout(this.orterTimeout);
  }


  focusYrkenSearch(event) {
    this.valYrken = undefined;
    this.showYrkenCriteria = true;
  }

  focusOrterSearch(event) {
    this.valOrter = undefined;
    this.showOrterCriteria = true;
  }

  blurYrkenSearch(event) {
    this.yrkenBlurTimeout = setTimeout(() => {
      if (this.valYrken) {
        const textValue = event.target.value;
        console.log(event, textValue)

        if (textValue) {
          const input = {
            id: textValue,
            namn: textValue,
            typ: 'fritext'
          }
          this.yrkenPushChoosenValue(input);
        }
      }
      this.yrkenTimeout = setTimeout(() => {
        this.showYrkenCriteria = false;
      }, 100);
    }, 200);
  }

  blurOrterSearch(event) {
    this.orterBlurTimeout = setTimeout(() => {
      if (this.valOrter) {
        const textValue = event.target.value;

        if (textValue) {
          const input = {
            id: textValue,
            namn: textValue,
            typ: 'fritext'
          }
          this.orterPushChoosenValue(input);
        }
      }
      this.orterTimeout = setTimeout(() => {
        this.showOrterCriteria = false;
      }, 100);
    }, 200);
  }

  ngOnInit() {
    this.pbMatchning.getNumberOfAvailableJobs().subscribe((result) => {
      this.antalLedigaJobb = this.util.formatNumberOfJobs(result.toString());
    });
  }

  searchButtonClick() {
    window.location.href = this.util.getUrlForCriteria(this.selectedKriterier.getSelectedKriterier());
  }

}
