import { TestBed, async, inject } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { GoogleAnalyticsEventsService } from './services/google-analytics-events/google-analytics-events.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        GoogleAnalyticsEventsService
      ]
    }).compileComponents();
  }));

  it('should create the app', inject([GoogleAnalyticsEventsService], (googleAnalyticsEventsService: GoogleAnalyticsEventsService) => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

});
