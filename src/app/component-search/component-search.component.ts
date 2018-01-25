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

  val: Profilkriterium;
  results: Array<Profilkriterium>;

  constructor(private pbKriterier: PbapiKriterierService) {
    this.antalLedigaJobb = '85 323';
  }

  search(event) {
    this.pbKriterier.getKriterierForTypeAndFilter('YRKEN', event.query).then((data => {
      console.log(data.matchningskriteriumList);
      this.results = data.matchningskriteriumList;
    }));
  }

  ngOnInit() {
  }

}
