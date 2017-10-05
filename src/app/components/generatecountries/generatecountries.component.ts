import { Component, OnInit } from '@angular/core';
import { LanderService } from '../../services/lander/lander.service';
import { Lan } from '../../models/Lan.interface';
import { Kommun } from '../../models/Kommun.interface';
import { Land } from '../../models/Land.interface';

@Component({
  selector: 'app-generatecountries',
  templateUrl: './generatecountries.component.html',
  styleUrls: ['./generatecountries.component.scss'],
  providers: [
    LanderService
  ]
})
export class GeneratecountriesComponent implements OnInit {

  lander: Array<Land>;
  lan: Array<Lan>;
  kommuner: Array<Kommun>;
  result: string;
  sweden: Land;

  constructor(private landerService: LanderService) {
    this.sweden = {
      id: '00',
      namn: 'Sverige',
      typ: 'LAN'
    };
    this.landerService.getAllCountries().then(data => {
      this.lander = data;
      this.landerService.getAllCounties().then(counties => {
        this.lan = counties;
        this.lan = this.lan.filter(lan => lan.id !== '00');
        this.landerService.getAllMuncipalities().then(muncipalities => {
          this.kommuner = muncipalities;
          this.populateResult();
        });
      });
    });
  }

  ngOnInit() {
  }

  populateResult() {
    for (const lan of this.lan) {
      lan.kommuner = this.kommuner.filter(item => item.id.slice(0, 2) === lan.id);
    }
    this.sweden.lan = this.lan;
    this.lander.unshift(this.sweden);
    this.result = JSON.stringify(this.lander, undefined, 2);
  }
  getMuncipalitiesForCounty(county: Lan) {
    county.kommuner = this.kommuner.filter(item => item.id.slice(0, 2) === county.id);
  }

  printJsonInNewTag() {
    const url = 'data:text/json;charset=utf8,' + encodeURIComponent(this.result);
    window.open(url, '_blank');
    window.focus();
  }
}
