import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { GoogleAnalyticsEventsService } from "./services/google-analytics-events/google-analytics-events.service";
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DemopageComponent } from './demopage/demopage.component';
import { TestcomponentComponent } from './testcomponent/testcomponent.component';

@NgModule({
  declarations: [
    AppComponent,
    DemopageComponent,
    TestcomponentComponent,
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
