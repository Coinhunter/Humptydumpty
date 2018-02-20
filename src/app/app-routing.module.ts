import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { SearchComponent } from 'app/components/search/search.component';
import { QuicklinksComponent } from 'app/components/quicklinks/quicklinks.component';
import { SparadejobbComponent } from 'app/components/sparadejobb/sparadejobb.component';

const routes: Routes = [
  { path: 'search', component: SearchComponent },
  { path: 'quicklinks', component: QuicklinksComponent },
  { path: 'sparadejobb', component: SparadejobbComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}