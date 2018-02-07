import { Component, OnInit } from '@angular/core';
import { PbapiKriterierService } from 'app/services/pbapi-kriterier/pbapi-kriterier.service';

@Component({
  selector: 'app-component-valj-fran-lista',
  templateUrl: './component-valj-fran-lista.component.html',
  styleUrls: ['./component-valj-fran-lista.component.scss']
})
export class ComponentValjFranListaComponent implements OnInit {

  constructor(private pbKriterier: PbapiKriterierService) { }

  yrkesHierarki;

  yrkesMap;

  yrkesOmradenCheckboxes:string[] = [];

  //Dessa ska nog vara en del av yrkesHierarkiobjektet.. 
  yrkesGrupperCheckboxes:string[] = [];
  yrkenCheckboxes:string[] = [];


  ngOnInit() {
    this.pbKriterier.getYrkesStruktur().subscribe((data) => {
      this.yrkesHierarki = data;
      console.log(this.yrkesHierarki);

      //this.yrkesMap = this.buildYrkesMap(data);
      //console.log(this.yrkesMap);

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
