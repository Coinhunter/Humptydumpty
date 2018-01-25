import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { GoogleAnalyticsEventsService } from "./services/google-analytics-events/google-analytics-events.service";
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ComponentDirectedcommunicationComponent } from './component-directedcommunication/component-directedcommunication.component';
import { ComponentSearchpackagesComponent } from './component-searchpackages/component-searchpackages.component';
import { ComponentQuicklinksComponent } from './component-quicklinks/component-quicklinks.component';
import { ComponentSearchComponent } from './component-search/component-search.component';

import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/components/autocomplete/autocomplete';
import { HttpClientModule } from '@angular/common/http';

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
    AppRoutingModule,
    FormsModule,
    AutoCompleteModule,
    HttpClientModule,
  ],
  providers: [
    GoogleAnalyticsEventsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
