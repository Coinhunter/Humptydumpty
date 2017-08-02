import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
//import { ResultContainerService } from './services/result-container-map/result-container-map.service';
//import { SearchResultService } from './services/search-result';

@NgModule({
  declarations: [
    AppComponent,
 //   ResultContainerService,
 //   SearchResultService,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent] //, ResultContainerService]
})
export class AppModule { }
