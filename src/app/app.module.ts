import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { GoogleAnalyticsEventsService } from "./services/google-analytics-events/google-analytics-events.service";
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ComponentDirectedcommunicationComponent } from './component-directedcommunication/component-directedcommunication.component';
import { ComponentSearchpackagesComponent } from './component-searchpackages/component-searchpackages.component';
import { ComponentQuicklinksComponent } from './component-quicklinks/component-quicklinks.component';
import { ComponentSearchComponent } from './component-search/component-search.component';

@NgModule({
  declarations: [
    AppComponent,
    ComponentDirectedcommunicationComponent,
    ComponentSearchpackagesComponent,
    ComponentQuicklinksComponent,
    ComponentSearchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
  	GoogleAnalyticsEventsService
  ],
  bootstrap: [AppComponent] //, ResultContainerService]
})
export class AppModule { }
