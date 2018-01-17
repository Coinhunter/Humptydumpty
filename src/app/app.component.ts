import { Component, Injectable, OnInit } from '@angular/core';
import { GoogleAnalyticsEventsService } from './services/google-analytics-events/google-analytics-events.service';
import { Router, NavigationEnd } from "@angular/router";

declare var ga: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  constructor(public router: Router, public googleAnalyticsEventsService: GoogleAnalyticsEventsService) {}

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
