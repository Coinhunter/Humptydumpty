import { Component, Injectable, OnInit } from '@angular/core';
import { Router, NavigationEnd } from "@angular/router";

import { ComponentDirectedcommunicationComponent } from './component-directedcommunication/component-directedcommunication.component';
import { ComponentSearchpackagesComponent } from './component-searchpackages/component-searchpackages.component';
import { ComponentQuicklinksComponent } from './component-quicklinks/component-quicklinks.component';
import { ComponentSearchComponent } from './component-search/component-search.component';

declare var ga: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  constructor(public router: Router) {}

  ngOnInit() {
    /*
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        ga('set', 'page', event.urlAfterRedirects);
        ga('send', 'pageview');
      }
    });
    */
  }
}
