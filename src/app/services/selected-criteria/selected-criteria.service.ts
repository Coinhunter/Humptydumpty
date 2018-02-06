import { Injectable } from '@angular/core';
import { Profilkriterium } from 'app/models/Profilkriterium';

@Injectable()
export class SelectedCriteriaService {

  private selectedYrkesKriterier:Array<Profilkriterium> = [];
  private selectedPlatsKriterier:Array<Profilkriterium> = [];
  
  private selectedFoldoutKriterier:Array<Profilkriterium> = [];

  constructor() { }

  getSelectedKriterier() {
    return this.selectedYrkesKriterier
      .concat(this.selectedPlatsKriterier)
      .concat(this.selectedFoldoutKriterier);
  }

  addFoldoutKriterie(kriterie:Profilkriterium) {
    this.selectedFoldoutKriterier.push(kriterie);
  }

  removeFoldoutKriterie(kriterie:Profilkriterium) {
    const index = this.selectedFoldoutKriterier.findIndex((searchKriterie) => {
      if (searchKriterie.varde === kriterie.varde && searchKriterie.namn === kriterie.namn) {
        return true;
      }
      return false;
    });
    if (index > -1) {
      this.selectedFoldoutKriterier.splice(index, 1);
    }
  }

  setSelectedYrkesKriterier(selectedYrkesKriterier:Array<Profilkriterium>) {
    this.selectedYrkesKriterier = selectedYrkesKriterier;
  }

  getSelectedYrkesKriterier():Array<Profilkriterium> {
    return this.selectedYrkesKriterier;
  }

  setSelectedPlatsKriterier(selectedPlatsKriterier:Array<Profilkriterium>) {
    this.selectedPlatsKriterier = selectedPlatsKriterier;
  }

  getSelectedPlatsKriterier():Array<Profilkriterium> {
    return this.selectedPlatsKriterier;
  }

}
