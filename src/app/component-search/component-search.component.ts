import { Component, OnInit } from '@angular/core';

import { PbapiKriterierService } from '../services/pbapi-kriterier/pbapi-kriterier.service';
import { PbapiMatchningService } from '../services/pbapi-matchning/pbapi-matchning.service';
import { UtilService } from '../services/util/util.service';

import { Profilkriterium } from 'app/models/Profilkriterium';
import { HttpClient } from '@angular/common/http';
import { SynonymSearchResultDTO } from 'app/models/SynonymSearchResultDTO';


@Component({
  selector: 'app-component-search',
  templateUrl: './component-search.component.html',
  styleUrls: ['./component-search.component.scss'],
  providers: [ PbapiKriterierService, PbapiMatchningService, UtilService ],
})
export class ComponentSearchComponent implements OnInit {

  antalLedigaJobb: string;

  // Yrken, yrkesgrupper, yrkesområden..
  showYrkenCriteria: boolean = false;
  valYrken: Profilkriterium;
  yrkenResults: Array<Profilkriterium>;
  chosenYrken: Array<Profilkriterium> = [];
  yrkenTimeout: any;

  // Orter, kommun, länder..
  showOrterCriteria: boolean = false;
  valOrter: Profilkriterium;
  orterResults: Array<Profilkriterium>;
  chosenOrter: Array<Profilkriterium> = [];
  orterTimeout: any;

  constructor(private pbKriterier: PbapiKriterierService,
      private pbMatchning: PbapiMatchningService,
      private util: UtilService) {}

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
      data.matchningskriteriumList.slice(0,5).forEach((kriterium) => {
        kriterium.typ = kriterium.typ.toLowerCase();
        this.orterResults.push(kriterium);
      });
    });
  }

  yrkenAddValue(value) {
    // Avoid adding the same thing multiple times.
    var found = this.chosenYrken.find((profilkriterium) => {
      return profilkriterium.varde === value.id;
    });

    if (!found) {
      this.chosenYrken.push(new Profilkriterium(value.id, value.namn, value.typ));
    }

    this.valYrken = undefined;
    this.focusYrkenSearchInput();
  }

  orterAddValue(value) {
    // Avoid adding the same thing multiple times.
    var found = this.chosenOrter.find((profilkriterium) => {
      return profilkriterium.varde === value.id;
    });

    if (!found) {
      this.chosenOrter.push(new Profilkriterium(value.id, value.namn, value.typ));
    }

    this.valOrter = undefined;
    this.focusOrterSearchInput();
  }

  removeFromChosenYrken() {
    if (this.chosenYrken.length > 1) {
      this.focusYrkenSearchInput();
    } else {
      this.removeYrkenCriteria(this.chosenYrken[0]);
      this.focusYrkenSearchInput();
    }
  }

  removeFromChosenOrter() {
    if (this.chosenOrter.length > 1) {
      this.focusOrterSearchInput();
    } else {
      this.removeYrkenCriteria(this.chosenOrter[0]);
      this.focusOrterSearchInput();
    }
  }

  focusYrkenSearchInput() {
    document.getElementById('search-yrken').getElementsByTagName("input")[0].focus();
  }  

  focusOrterSearchInput() {
    document.getElementById('search-orter').getElementsByTagName("input")[0].focus();
  }

  removeYrkenCriteria(profilkriterium) {
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
    this.yrkenTimeout = setTimeout(() => {
      this.showYrkenCriteria = false;
    }, 100);
  }

  blurOrterSearch(event) {
    this.orterTimeout = setTimeout(() => {
      this.showOrterCriteria = false;
    }, 100);
  }

  ngOnInit() {
    this.pbMatchning.getNumberOfAvailableJobs().subscribe((result) => {
      this.antalLedigaJobb = this.util.formatNumberOfJobs(result.toString());
    });
  }

}
