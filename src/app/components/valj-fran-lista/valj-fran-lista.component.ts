import { Component, OnInit } from '@angular/core';
import { PbapiKriterierService } from 'app/services/pbapi-kriterier/pbapi-kriterier.service';

@Component({
  selector: 'app-valj-fran-lista',
  templateUrl: './valj-fran-lista.component.html',
  styleUrls: ['./valj-fran-lista.component.scss']
})
export class ValjFranListaComponent implements OnInit {

  constructor(private pbKriterier: PbapiKriterierService) { }

  loading:boolean = true;

  yrkesHierarki;

  yrkesMap;

  yrkesOmradenCheckboxes:string[] = [];

  //Dessa ska nog vara en del av yrkesHierarkiobjektet.. 
  yrkesGrupperCheckboxes:string[] = [];
  yrkenCheckboxes:string[] = [];


  ngOnInit() {
    this.pbKriterier.getYrkesStruktur().subscribe((data) => {
      this.yrkesHierarki = data;
      this.loading = false;
    });
  }

  buildYrkesMap(data) {
    let omradesMap = new Map();
    data.forEach((omrade) => {
      omrade.yrkesgruppMap = new Map();
      omrade.yrkesgrupper.forEach((yrkesgrupp) => {
        omrade.yrkesgruppMap.set(yrkesgrupp.id, yrkesgrupp);
        yrkesgrupp.yrkesMap = new Map();
        yrkesgrupp.yrken.forEach((yrke) => {
          yrkesgrupp.yrkesMap.set(yrke.id, yrke);
        });
      });
      omradesMap.set(omrade.id, omrade);
    });
    return omradesMap;
  }

}
