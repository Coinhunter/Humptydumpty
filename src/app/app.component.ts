import { Component, Injectable, OnInit } from '@angular/core';
import { Router, NavigationEnd } from "@angular/router";

import { ComponentDirectedcommunicationComponent } from './component-directedcommunication/component-directedcommunication.component';
import { ComponentSearchpackagesComponent } from './component-searchpackages/component-searchpackages.component';
import { ComponentQuicklinksComponent } from './component-quicklinks/component-quicklinks.component';
import { ComponentSearchComponent } from './component-search/component-search.component';
import { SelectedCriteriaService } from './services/selected-criteria/selected-criteria.service';
import { UtilService } from './services/util/util.service'; 

declare var ga: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ SelectedCriteriaService, UtilService ]
})

export class AppComponent implements OnInit {
  constructor(public router: Router) {}

  ngOnInit() {}
}
