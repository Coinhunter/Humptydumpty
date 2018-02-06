import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ComponentDirectedcommunicationComponent } from './component-directedcommunication/component-directedcommunication.component';
import { ComponentSearchpackagesComponent } from './component-searchpackages/component-searchpackages.component';
import { ComponentQuicklinksComponent } from './component-quicklinks/component-quicklinks.component';
import { ComponentSearchComponent } from './component-search/component-search.component';

import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/components/autocomplete/autocomplete';
import { CheckboxModule } from 'primeng/components/checkbox/checkbox';

import { HttpClientModule } from '@angular/common/http';
import { UtilService } from 'app/services/util/util.service';
import { ComponentSearchExpandComponent } from './component-search-expand/component-search-expand.component';
import { ComponentValjFranListaComponent } from './component-valj-fran-lista/component-valj-fran-lista.component';

@NgModule({
  declarations: [
    AppComponent,
    ComponentDirectedcommunicationComponent,
    ComponentSearchpackagesComponent,
    ComponentQuicklinksComponent,
    ComponentSearchComponent,
    ComponentSearchExpandComponent,
    ComponentValjFranListaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AutoCompleteModule,
    CheckboxModule,
    HttpClientModule,
  ],
  providers: [
    UtilService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
