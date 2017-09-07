import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DemopageComponent } from './demopage/demopage.component';
import { TestcomponentComponent } from './testcomponent/testcomponent.component'
import { AppComponent } from './app.component';

import {StartPageComponent} from './components/startpage/startpage.component';
import {SavedJobsComponent} from './components/savedjobs/savedjobs.component';
import {SearchjobsComponent} from './components/searchjobs/searchjobs.component';

const routes: Routes = [
  { path: '', redirectTo: '/SearchJobs', pathMatch: 'full' },
  { path: 'test', component: TestcomponentComponent },
  { path: 'demopage', component: DemopageComponent },
  {
        path: 'platsbankenprototype',
        component: StartPageComponent
    },
    {
        path: 'SavedJobs',
        component: SavedJobsComponent
    },
    {
        path: 'SearchJobs',
        component: SearchjobsComponent
    }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
