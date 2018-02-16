import { Component, Injectable, OnInit } from '@angular/core';
import { Router, NavigationEnd } from "@angular/router";

import { DirectedcommunicationComponent } from './components/directedcommunication/directedcommunication.component';
import { SearchpackagesComponent } from './components/searchpackages/searchpackages.component';
import { ComponentQuicklinksComponent } from './components/component-quicklinks/component-quicklinks.component';
import { SearchComponent } from './components/search/search.component';
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
