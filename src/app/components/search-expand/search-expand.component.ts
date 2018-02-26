import { Component, OnInit } from '@angular/core';
import { Profilkriterium } from 'app/models/Profilkriterium';
import { PbapiKriterierService } from '../../services/pbapi-kriterier/pbapi-kriterier.service';
import { SelectedCriteriaService } from 'app/services/selected-criteria/selected-criteria.service';
import { UtilService } from 'app/services/util/util.service';

@Component({
  selector: 'app-search-expand',
  templateUrl: './search-expand.component.html',
  styleUrls: ['./search-expand.component.scss'],
  providers: [ PbapiKriterierService ],
})
export class SearchExpandComponent implements OnInit {

  constructor(private selectedKriterier: SelectedCriteriaService, private util: UtilService) { }

  ingenErfarenhet = false;
  heltid = false;
  deltid = false;
  behovsanstallning = false;
  sommarferie = false;
  vanligAnstallning = false;

  ngOnInit() {
  }

  updateChosenCriteria(selected, namn, type, value) {
    if (selected) {
      this.selectedKriterier.addFoldoutKriterie(new Profilkriterium(value, namn, type));
    } else {
      this.selectedKriterier.removeFoldoutKriterie(new Profilkriterium(value, namn, type));
    }
  }

}
