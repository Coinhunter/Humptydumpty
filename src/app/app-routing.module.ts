import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DemopageComponent } from './demopage/demopage.component';
import { TestcomponentComponent } from './testcomponent/testcomponent.component'
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: '', redirectTo: '/test', pathMatch: 'full' },
  { path: 'test', component: TestcomponentComponent },
  { path: 'demopage', component: DemopageComponent }
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