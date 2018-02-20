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
    this.pbKriterier.getYrkesStruktur().then((data) => {
      this.yrkesHierarki = this.buildHierarki(data);
      this.loading = false;
    });
  }

  buildHierarki(data) {
    data.forEach((omrade) => {
      omrade.selected = false;
      omrade.partialSelect = false;
      omrade.open = false;
      omrade.yrkesgrupper.forEach((yrkesgrupp) => {
        yrkesgrupp.selected = false;
        yrkesgrupp.partialSelect = false;
        yrkesgrupp.open = false;
        yrkesgrupp.yrken.forEach((yrke) => {
          yrke.partialSelect = false;
          yrke.selected = false;
        });
        yrkesgrupp.children = yrkesgrupp.yrken;
        delete yrkesgrupp.yrken;
      });
      omrade.children = omrade.yrkesgrupper;
      delete omrade.yrkesgrupper;
    });
    return data;
  }

  toggleOpen(item) {
    const scrollY = window.scrollY;
    item.open = !item.open;
    window.scrollTo(0, scrollY);
  }

  selectOmrade(omrade) {
    omrade.selected = !omrade.selected;
    omrade.open = !omrade.open;
    /*
    omrade.children.forEach((yrkesgrupp) => {
      yrkesgrupp.selected = omrade.selected;
      yrkesgrupp.children.forEach((yrke) => {
        yrke.selected = yrkesgrupp.selected;
      });      
    });
    */
  }

  selectYrkesgrupp(omrade, yrkesgrupp) {
    yrkesgrupp.selected = !yrkesgrupp.selected;
    this.partiallySelected(omrade);
  }

  selectYrke(omrade, yrkesgrupp, yrke) {
    yrke.selected = !yrke.selected;
    this.partiallySelected(yrkesgrupp);
    this.partiallySelected(omrade);
  }

  partiallySelected(omrade) {
    // Collect number of selected elements.
    let selectedElements:number = 0;
    let partiallySelectedItems:number = 0;
    omrade.children.forEach((yrkesgrupp) => {
      if (yrkesgrupp.selected) {
        selectedElements++;
      } else if (yrkesgrupp.partialSelect) {
        partiallySelectedItems++;
      }
    });

    // If they're all selected, mark yrkesgrupp as selected also.
    omrade.selected = (selectedElements == omrade.children.length);

    // It is partially selected if one or more items are selected or partially selected but not all are selected.
    let selectedOrPartiallySelectedItems = selectedElements + partiallySelectedItems;
    omrade.partialSelect = selectedOrPartiallySelectedItems > 0 && selectedElements < omrade.children.length;
  }

}
