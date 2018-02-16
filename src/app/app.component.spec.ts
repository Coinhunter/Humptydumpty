import { TestBed, async, inject } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { ComponentDirectedcommunicationComponent } from './components/component-directedcommunication/component-directedcommunication.component';
import { ComponentSearchpackagesComponent } from './components/component-searchpackages/component-searchpackages.component';
import { ComponentQuicklinksComponent } from './components/component-quicklinks/component-quicklinks.component';
import { ComponentSearchComponent } from './components/component-search/component-search.component';
import { ComponentSearchExpandComponent } from './components/component-search-expand/component-search-expand.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        ComponentDirectedcommunicationComponent,
        ComponentSearchpackagesComponent,
        ComponentQuicklinksComponent,
        ComponentSearchComponent,
        ComponentSearchExpandComponent
      ],
      providers: [ ]      
    }).compileComponents();
  }));

  it('should create the app', inject([], () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

});
