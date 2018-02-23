import { Component, OnInit } from '@angular/core';
import { PbapiKriterierService } from 'app/services/pbapi-kriterier/pbapi-kriterier.service';

@Component({
  selector: 'pb-valj-plats-fran-lista',
  templateUrl: './valj-plats-fran-lista.component.html',
  styleUrls: ['./valj-plats-fran-lista.component.scss']
})
export class ValjPlatsFranListaComponent implements OnInit {

  constructor(private pbKriterier: PbapiKriterierService) { }

  platsHierarki;

  visaAntal = 10;
  visaFler = false;
  antalFler;

  ngOnInit() {
    this.pbKriterier.getPlatsStruktur().then((data) => {
      this.platsHierarki = data;
      this.antalFler = this.platsHierarki.length - 10;
    }, (error) => {
      console.error(error);
    });
  }

  toggleVisaFler() {
    this.visaFler = !this.visaFler;
  }

  getPlatsHierarki() {
    if (this.visaFler) {
      return this.platsHierarki;
    } else {
      return this.platsHierarki.slice(0, this.visaAntal);
    }
  }

  toggleOpen(item) {
    const scrollY = window.scrollY;
    item.open = !item.open;
    window.scrollTo(0, scrollY);
  }
  
  selectLand(lander, land) {
    if (land.selected) {
      this.deselect(land, lander);
    } else {
      this.select(land, lander);
    }
  }

  selectLan(land, lan) {
    if (lan.selected) {
      this.deselect(lan, land);
    } else {
      this.select(lan, land);
    }
    this.partiallySelected(land);
  }

  selectKommun(land, lan, kommun) {
    if (kommun.selected) {
      this.deselect(kommun, lan);
    } else {
      this.select(kommun, lan);
    }
    this.partiallySelected(lan);
    this.partiallySelected(land);
  }

  select(item, parent) {
    item.selected = true;
    item.open = true;
  }

  deselect(item, parent) {
    item.selected = false;
    let numberOfSelectedAfter = 0;
    parent.children.forEach((sibling) => {
      numberOfSelectedAfter = sibling.selected  ? (numberOfSelectedAfter+1) : numberOfSelectedAfter;
    });
    parent.open = numberOfSelectedAfter > 0;
  }

  partiallySelected(land) {
    // Collect number of selected elements.
    let selectedElements:number = 0;
    let partiallySelectedItems:number = 0;
    land.children.forEach((lan) => {
      if (lan.selected) {
        selectedElements++;
      } else if (lan.partialSelect) {
        partiallySelectedItems++;
      }
    });

    // If they're all selected, mark lan as selected also.
    land.selected = (selectedElements == land.children.length);

    // It is partially selected if one or more items are selected or partially selected but not all are selected.
    let selectedOrPartiallySelectedItems = selectedElements + partiallySelectedItems;
    land.partialSelect = selectedOrPartiallySelectedItems > 0 && selectedElements < land.children.length;
  }   

}
