import { Component, OnInit } from '@angular/core';
import { PbapiKriterierService } from 'app/services/pbapi-kriterier/pbapi-kriterier.service';

@Component({
  selector: 'pb-valj-yrke-fran-lista',
  templateUrl: './valj-yrke-fran-lista.component.html',
  styleUrls: ['./valj-yrke-fran-lista.component.scss']
})
export class ValjYrkeFranListaComponent implements OnInit {

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
      this.yrkesHierarki = data;
      this.loading = false;
    }, (error) => {
      //console.log(error);
    });
  }

  toggleOpen(item) {
    const scrollY = window.scrollY;
    item.open = !item.open;
    window.scrollTo(0, scrollY);
  }

  selectOmrade(omrade) {
    omrade.selected = !omrade.selected;
    omrade.open = !omrade.open;
  }

  selectYrkesgrupp(omrade, yrkesgrupp) {
    yrkesgrupp.selected = !yrkesgrupp.selected;
    yrkesgrupp.open = !yrkesgrupp.open;    
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
