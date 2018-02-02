import { Component, OnInit } from '@angular/core';
import { Profilkriterium } from 'app/models/Profilkriterium';
import { PbapiKriterierService } from '../services/pbapi-kriterier/pbapi-kriterier.service';

@Component({
  selector: 'app-component-search-expand',
  templateUrl: './component-search-expand.component.html',
  styleUrls: ['./component-search-expand.component.scss'],
  providers: [ PbapiKriterierService ],
})
export class ComponentSearchExpandComponent implements OnInit {


  omfattning: string[] = [];
  
  korkort: string[] = []; // The values from the checkboxes 
  korkortKriterier: Array<any>; // The values we fetched from the API.

  anstallningsvillkor: string[] = []; // Values from the checkboxes
  anstallningstyperKriterier: Array<any>; // Fetched values.

  constructor(private pbKriterier: PbapiKriterierService) { }

  ngOnInit() {
    this.pbKriterier.getKorkortKriterier().subscribe((data) => {
      this.korkortKriterier = data;
    });

    this.pbKriterier.getAnstallningstypKriterier().subscribe((data) => {
      this.anstallningstyperKriterier = data;
    });

    setInterval(() => {
      console.log(this.getChosenArbetsomfattning());      
    }, 2000);
    
  }

  getChosenKorkort() {
    const chosenKorkortKriteria = [];
    this.korkort.forEach(kriterie => {
      const result = this.korkortKriterier.find((current) => {
        return current.id === kriterie;
      });
      if (result) {        
        chosenKorkortKriteria.push(new Profilkriterium(result.id, result.namn, result.typ));
      }
    });
    return chosenKorkortKriteria;
  }

  getChosenAnstallningstyper() {
    const chosenAnstallningstypKriterier = [];
    this.anstallningsvillkor.forEach(kriterie => {
      const result = this.anstallningstyperKriterier.find((current) => {
        return current.id === kriterie;
      });
      if (result) {
        chosenAnstallningstypKriterier.push(new Profilkriterium(result.id, result.namn, result.typ));
      }
    });
    return chosenAnstallningstypKriterier;
  }

  getChosenArbetsomfattning() {
    let chosenArbetsomfattning = [];
    this.omfattning.forEach(kriterie => {
      chosenArbetsomfattning.push(new Profilkriterium(kriterie, kriterie, 'ARBETSOMFATTNING'));
    });

    if(chosenArbetsomfattning.length === 2) {
      // Both Chosen! We should replace them with a single other criterion.
      chosenArbetsomfattning = [];
      chosenArbetsomfattning.push(new Profilkriterium('Heltid/Deltid 5-100%','Heltid/Deltid 5-100%', 'ARBETSOMFATTNING'))
    }

    return chosenArbetsomfattning;
  }



}
