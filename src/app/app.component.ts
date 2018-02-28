import { Component, Injectable, OnInit } from '@angular/core';
import { Router, NavigationEnd } from "@angular/router";

import { DirectedcommunicationComponent } from './components/directedcommunication/directedcommunication.component';
import { SearchpackagesComponent } from './components/searchpackages/searchpackages.component';
import { QuicklinksComponent } from './components/quicklinks/quicklinks.component';
import { SearchComponent } from './components/search/search.component';
import { SelectedCriteriaService } from './services/selected-criteria/selected-criteria.service';
import { UtilService } from './services/util/util.service'; 
import { OverlayService } from 'app/services/overlay/overlay.service';

declare var ga: Function;

@Component({
  selector: 'pb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ SelectedCriteriaService, UtilService, OverlayService ]
})

export class AppComponent implements OnInit {
  constructor(public router: Router, private overlay: OverlayService) {}

  showOverlay = false;

  toggleOverlay($event) {
    this.overlay.disableOverlay('all');
  }

  ngOnInit() {
    this.overlay.getOverlaySubject().asObservable().subscribe((overlay) => {
      this.showOverlay = overlay.varde;
    })
  }
}
