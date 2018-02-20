import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DirectedcommunicationComponent } from './components/directedcommunication/directedcommunication.component';
import { SearchpackagesComponent } from './components/searchpackages/searchpackages.component';
import { QuicklinksComponent } from './components/quicklinks/quicklinks.component';
import { SearchComponent } from './components/search/search.component';

import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/components/autocomplete/autocomplete';
import { CheckboxModule } from 'primeng/components/checkbox/checkbox';

import { HttpClientModule } from '@angular/common/http';
import { UtilService } from 'app/services/util/util.service';
import { SearchExpandComponent } from './components/search-expand/search-expand.component';
import { ValjFranListaComponent } from './components/valj-fran-lista/valj-fran-lista.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SparadejobbComponent } from './components/sparadejobb/sparadejobb.component';
import { SparadejobbService } from 'app/services/sparadejobb/sparadejobb.service';


@NgModule({
  declarations: [
    AppComponent,
    DirectedcommunicationComponent,
    SearchpackagesComponent,
    QuicklinksComponent,
    SearchComponent,
    SearchExpandComponent,
    ValjFranListaComponent,
    HeaderComponent,
    FooterComponent,
    SparadejobbComponent,
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
    SparadejobbService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
