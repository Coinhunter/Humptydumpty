import { Component, OnInit } from '@angular/core';
import { LanderService } from '../../services/lander/lander.service';
import { Lan } from '../../models/Lan.interface';
import { Kommun } from '../../models/Kommun.interface';
import { Land } from '../../models/Land.interface';
import { Varldsdel } from '../../models/Varldsdel.interface';

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
  restOfEurope: Varldsdel;
  restOfWorld: Varldsdel;
  restOfEuropeList: Array<Land>;
  restOfWorldList: Array<Land>;
  resultList: Array<any>;

  constructor(private landerService: LanderService) {
    this.sweden = {
      id: '00',
      namn: 'Sverige',
      typ: 'LAN'
    };
    this.restOfEurope = {
      id: '000',
      namn: 'Övriga Europa',
      typ: 'VARLDSDEL'
    };
    this.restOfWorld = {
      id: '0000',
      namn: 'Övriga världen',
      typ: 'VARLDSDEL'
    };
    this.resultList = new Array<any>();
    this.restOfEuropeList = new Array<Land>();
    this.restOfWorldList = new Array<Land>();
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
    this.resultList.push(this.sweden);

    const arr = [
      'Albanien',
      'Andorra',
      'Belgien',
      'Bosnien och Hercegovina',
      'Bulgarien',
      'Danmark',
      'Estland',
      'Finland',
      'Frankrike',
      'Färöarna',
      'Gibraltar',
      'Grekland',
      'Irland',
      'Island',
      'Italien',
      'Kroatien',
      'Lettland',
      'Liechtenstein',
      'Litauen',
      'Luxemburg',
      'Makedonien',
      'Malta',
      'Moldavien',
      'Monaco',
      'Montenegro',
      'Nederländerna',
      'Norge',
      'Polen',
      'Portugal',
      'Rumänien',
      'Ryssland',
      'San Marino',
      'Schweiz',
      'Serbien',
      'Slovakien',
      'Slovenien',
      'Spanien',
      'Storbritannien',
      'Tjeckien',
      'Turkiet',
      'Tyskland',
      'Ukraina',
      'Ungern',
      'Heliga stolen (Vatikanstaten)',
      'Vitryssland',
      'Österrike'
    ];
    for (const land of this.lander) {
      const found = (arr.indexOf(land.namn) !== -1);
      if (found) {
        this.restOfEuropeList.push(land);
      } else {
        this.restOfWorldList.push(land);
      }
    }
    this.restOfEurope.lander = this.restOfEuropeList;
    this.restOfWorld.lander = this.restOfWorldList;
    this.resultList.push(this.restOfEurope);
    this.resultList.push(this.restOfWorld);
    this.result = JSON.stringify(this.resultList, undefined, 2);
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
