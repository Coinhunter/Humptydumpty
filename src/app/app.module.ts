import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { GoogleAnalyticsEventsService } from './services/google-analytics-events/google-analytics-events.service';
import { CommonVariablesService } from './services/common-variables/common-variables.service';
import { SearchJobsCommonVariablesService } from './services/search-jobs-common-variables/search-jobs-common-variables.service';
import { AdService } from './services/ad/ad.service';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DemopageComponent } from './demopage/demopage.component';
import { TestcomponentComponent } from './testcomponent/testcomponent.component';
import { HeaderComponent } from './components/static/header.component';
import { FooterComponent } from './components/static/footer.component';
import { NavComponent } from './components/static/nav.component';
import { HelpComponent } from './components/static/help.component';
import { JoblistPipe } from './pipes/joblist.pipe';
import { JoblistComponent } from './components/savedjobs/joblist.component';
import { SavedJobsComponent } from './components/savedjobs/savedjobs.component';
import { StartPageComponent } from './components/startpage/startpage.component';
import { SearchjobsComponent } from './components/searchjobs/searchjobs.component';
import { RelatedmatchesPipe } from './pipes/relatedmatches.pipe';
import { GeneratejobareasComponent } from './components/generatejobareas/generatejobareas.component';
import { GeneratecountriesComponent } from './components/generatecountries/generatecountries.component';
import { ShowadComponent } from './components/searchjobs/showad/showad.component';

@NgModule({
  declarations: [
    AppComponent,
    DemopageComponent,
    TestcomponentComponent,
    HeaderComponent,
    NavComponent,
    FooterComponent,
    HelpComponent,
    AppComponent,
    JoblistPipe,
    JoblistComponent,
    SavedJobsComponent,
    StartPageComponent,
    SearchjobsComponent,
    RelatedmatchesPipe,
    GeneratejobareasComponent,
    GeneratecountriesComponent,
    ShowadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule
  ],
  providers: [
    GoogleAnalyticsEventsService,
    CommonVariablesService,
    AdService,
    SearchJobsCommonVariablesService
  ],
  bootstrap: [AppComponent] // ResultContainerService]
})
export class AppModule { }
