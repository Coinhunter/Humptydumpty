import { Component, OnInit } from '@angular/core';
import { Profilkriterium } from 'app/models/Profilkriterium';
import { PbapiKriterierService } from '../services/pbapi-kriterier/pbapi-kriterier.service';
import { SelectedCriteriaService } from 'app/services/selected-criteria/selected-criteria.service';

@Component({
  selector: 'app-component-search-expand',
  templateUrl: './component-search-expand.component.html',
  styleUrls: ['./component-search-expand.component.scss'],
  providers: [ PbapiKriterierService, SelectedCriteriaService ],
})
export class ComponentSearchExpandComponent implements OnInit {

  constructor(private selectedKriterier: SelectedCriteriaService) { }

  ngOnInit() {
  }

  updateChosenCriteria(selected, namn, type, value) {
    if (selected) {
      this.selectedKriterier.addSingleKriterie(new Profilkriterium(value, namn, type));
    } else {
      this.selectedKriterier.removeSingleKriterie(new Profilkriterium(value, namn, type));
    }
    console.log(this.selectedKriterier.getSelectedKriterier());
  }

}
