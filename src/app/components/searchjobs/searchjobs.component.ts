import { Component, OnInit } from '@angular/core';
import { YrkenService } from '../../services/yrken/yrken.service';
import { PbapiMatchningService } from '../../services//pbapi-matchning/pbapi-matchning.service';
import { Yrkesomrade } from '../../models/Yrkesomrade.interface';
// import { Searchparameter } from '../../models/Searchparameter.interface';
import { Profilkriterium } from '../../models/Profilkriterium.interface';
import { Rekryteringsbehov } from '../../models/Rekryteringsbehov.interface';

@Component({
  selector: 'app-searchjobs',
  templateUrl: './searchjobs.component.html',
  styleUrls: ['./searchjobs.component.scss'],
  providers: [
    YrkenService,
    PbapiMatchningService
  ]
})
export class SearchjobsComponent implements OnInit {

  showTerms: boolean;
  showCompetences: boolean;
  showExperience: boolean;
  showLicences: boolean;
  showJobAreas: boolean;

  numberOfAvailableJobs: number;

  yrkesomraden: Array<Yrkesomrade>;
  searchparameters: Array<Profilkriterium>;
  searchResult: Array<any>;
  constructor(private yrkenService: YrkenService, private pbapiMatchningService: PbapiMatchningService) {
    this.showTerms = this.showCompetences = this.showExperience = this.showLicences = false;
    this.showJobAreas = false;
    this.searchparameters = new Array<Profilkriterium>();
    this.searchResult = new Array<any>();
    this.yrkenService.getLocalSelection().subscribe(yrkesomraden => {
        this.yrkesomraden = yrkesomraden;
    });
    this.pbapiMatchningService.getNumberOfAvailableJobs().then(data => {
      this.numberOfAvailableJobs = data;
    });
  }

  ngOnInit() {
  }

  toggleJobAreas (e) {
    this.showJobAreas = !this.showJobAreas;
    const target = e.target || e.srcElement;
    const children = target.parentNode.children;
    console.log(children);
    for (const child of children) {
      if (child.nodeName === 'DIV' && child.classList.contains('collapsed')) {
        child.classList.remove('collapsed');
        child.classList.add('expanded');
      } else if (child.nodeName === 'DIV' && child.classList.contains('expanded')) {
        child.classList.add('collapsed');
        child.classList.remove('expanded');
      }
    }
  }
  toggleChild(e): void {
    const target = e.target || e.srcElement;
    const children = target.parentNode.parentNode.children;
    for (const child of children) {
      if (child.nodeName === 'UL') {
          child.classList.toggle('hidden');
      } else if (child.nodeName === 'DIV' && child.classList.contains('liContent')) {
        const grandChildren = child.children;
        for (const grandChild of grandChildren) {
          if (grandChild.classList.contains('collapsed')) {
            grandChild.classList.remove('collapsed');
            grandChild.classList.add('expanded');
          } else if (grandChild.classList.contains('expanded')) {
            grandChild.classList.add('collapsed');
            grandChild.classList.remove('expanded');
          } else if (grandChild.classList.contains('checkbox')) {
            grandChild.classList.toggle('checked');
          }
        }
      }
    }
  }
  checkSelection(e): void {
    const target = e.target || e.srcElement;
    const children = target.parentNode.parentNode.children;
    for (const child of children) {
      if (child.nodeName === 'DIV' && child.classList.contains('liContent')) {
        const grandChildren = child.children;
        for (const grandChild of grandChildren) {
          if (grandChild.classList.contains('checkbox')) {
            grandChild.classList.toggle('checked');
          }
        }
      }
    }
  }
  addToList(id: number, name: string, type: string, toggle: boolean) {
    const found = this.searchparameters.some(function (el) {
      return el.varde === id.toString();
    });

    if (!found) {
      if (type.toUpperCase() === 'YRKE') {
        type = 'YRKESROLL';
      } else if (type.toUpperCase() === 'YRKESGRUPP') {
        type = 'YRKESGRUPP_ROLL';
      } else {
        type = 'YRKESOMRADE_ROLL';
      }
      this.searchparameters.push({
        'typ': type,
        'varde': id.toString(),
        'namn': name
      });
      // this.selectItemInList(id);
      this.search();
    } else if (toggle) {
      this.removeFromList(id);
    }
  }
  search() {
    this.pbapiMatchningService.getMatchingAds(this.searchparameters, 25, 0).then(data => {
      this.searchResult = data;
      console.log(this.searchResult);
    });
  }
  selectItemInList(id: number) {
    const element = document.querySelectorAll('[data-id="' + id + '"]');
    const children = element[0].childNodes;
    for (let i = 0; i < children.length; i++) {
      const child: any = children[i];
      if (child.nodeName === 'DIV' && child.classList.contains('checkbox')) {
        child.classList.add('checked')
      }
    }
  }
  removeFromListAndUnselect(id: number) {
    const element = document.querySelectorAll('[data-id="' + id + '"]');
    const children = element[0].childNodes;
    for (let i = 0; i < children.length; i++) {
      const child: any = children[i];
      if (child.nodeName === 'DIV' && child.classList.contains('checked')) {
        child.classList.remove('checked');
      }
    }
    this.removeFromList(id);
  }
  removeFromList(id: number) {
    this.searchparameters = this.searchparameters.filter(item => item.varde !== id.toString());
    this.search();
  }
  emptyList() {
    this.searchparameters.length = 0;
    const elements = document.getElementsByClassName('checkbox checked');
    console.log(elements.length);
    const children = new Array<any>();
    for (let i = 0; i < elements.length; i++) {
      const element: any = elements[i];
    }
    for (const child of children) {
      child.classList.remove('checked');
    }
  }
}
