import { Component, OnInit } from '@angular/core';
import { PbapiKriterierService } from 'app/services/pbapi-kriterier/pbapi-kriterier.service';

@Component({
  selector: 'app-component-valj-fran-lista',
  templateUrl: './component-valj-fran-lista.component.html',
  styleUrls: ['./component-valj-fran-lista.component.scss']
})
export class ComponentValjFranListaComponent implements OnInit {

  constructor(private pbKriterier: PbapiKriterierService) { }

  yrkesHierarki:object;

  ngOnInit() {
    this.pbKriterier.getYrkesStruktur().subscribe((data) => {
      this.yrkesHierarki = data;
      console.log(this.yrkesHierarki);
    })
  }

}
