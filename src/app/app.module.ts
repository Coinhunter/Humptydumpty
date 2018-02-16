import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DirectedcommunicationComponent } from './components/directedcommunication/directedcommunication.component';
import { ComponentSearchpackagesComponent } from './components/component-searchpackages/component-searchpackages.component';
import { ComponentQuicklinksComponent } from './components/component-quicklinks/component-quicklinks.component';
import { ComponentSearchComponent } from './components/component-search/component-search.component';

import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/components/autocomplete/autocomplete';
import { CheckboxModule } from 'primeng/components/checkbox/checkbox';

import { HttpClientModule } from '@angular/common/http';
import { UtilService } from 'app/services/util/util.service';
import { ComponentSearchExpandComponent } from './components/component-search-expand/component-search-expand.component';
import { ComponentValjFranListaComponent } from './components/component-valj-fran-lista/component-valj-fran-lista.component';
import { ComponentHeaderComponent } from './components/component-header/component-header.component';
import { ComponentFooterComponent } from './components/component-footer/component-footer.component';

@NgModule({
  declarations: [
    AppComponent,
    DirectedcommunicationComponent,
    ComponentSearchpackagesComponent,
    ComponentQuicklinksComponent,
    ComponentSearchComponent,
    ComponentSearchExpandComponent,
    ComponentValjFranListaComponent,
    ComponentHeaderComponent,
    ComponentFooterComponent,
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
