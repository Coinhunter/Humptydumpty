import { Injectable } from '@angular/core';
import { Profilkriterium } from 'app/models/Profilkriterium';

@Injectable()
export class SelectedCriteriaService {

  selectedKriterier:Array<Profilkriterium> = [];

  constructor() { }

  getSelectedKriterier() {
    return this.selectedKriterier;
  }

  setSelectedKriterier(kriterier:Array<Profilkriterium>) {
    this.selectedKriterier = kriterier;
  }

  addSingleKriterie(kriterie:Profilkriterium) {
    this.selectedKriterier.push(kriterie);
  }

  removeSingleKriterie(kriterie:Profilkriterium) {
    const index = this.selectedKriterier.findIndex((searchKriterie) => {
      if (searchKriterie.varde === kriterie.varde && searchKriterie.namn === kriterie.namn) {
        return true;
      }
      return false;
    });
    if (index > -1) {
      this.selectedKriterier.splice(index, 1);
    }
  }

}
