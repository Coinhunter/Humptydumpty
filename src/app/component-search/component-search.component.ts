import { Component, OnInit } from '@angular/core';

import { PbapiKriterierService } from '../services/pbapi-kriterier/pbapi-kriterier.service';
import { Profilkriterium } from 'app/models/Profilkriterium';
import { IProfilkriterium } from 'app/models/IProfilkriterium.interface';
import { HttpClient } from '@angular/common/http';
import { SynonymSearchResultDTO } from 'app/models/SynonymSearchResultDTO';


@Component({
  selector: 'app-component-search',
  templateUrl: './component-search.component.html',
  styleUrls: ['./component-search.component.scss'],
  providers: [ PbapiKriterierService ],
})
export class ComponentSearchComponent implements OnInit {

  antalLedigaJobb: string;
  showCriteria: boolean = false;

  val: Profilkriterium;
  results: Array<Profilkriterium>;

  chosenYrken: Array<Profilkriterium> = [];

  timeout: any; 

  constructor(private pbKriterier: PbapiKriterierService) {
    this.antalLedigaJobb = '85 323';
  }

  search(event) {
    this.results = [];
    this.results.push(new Profilkriterium(event.query, event.query, 'fritext'));

    this.pbKriterier.getKriterierForTypeAndFilter('YRKEN', event.query).then((data => {
            
      data.matchningskriteriumList.slice(0,5).forEach((kriterium) => {
        kriterium.typ = kriterium.typ.toLowerCase();
        this.results.push(kriterium);
      });

    }));
  }

  yrkenAddValue(value) {
    // Avoid adding the same thing multiple times.
    var found = this.chosenYrken.find((profilkriterium) => {
      return profilkriterium.varde === value.id;
    });

    if (!found) {
      this.chosenYrken.push(new Profilkriterium(value.id, value.namn, value.typ));
    }

    this.val = undefined;
    document.getElementById('search-yrken').focus();
  }

  removeCriteria(profilkriterium) {
    const index = this.chosenYrken.indexOf(profilkriterium);
    console.log(index);

    if (index > -1) {
      this.chosenYrken.splice(index, 1);
    }
    clearTimeout(this.timeout);
  }

  focusSearch(event) {
    this.val = undefined;
    this.showCriteria = true;
  }

  blurSearch(event) {
    this.timeout = setTimeout(() => {
      this.showCriteria = false;
      // this.val = new Profilkriterium(4444, 'Exempel', 'Fritext');
    }, 100);
  }

  ngOnInit() {
  }

}
