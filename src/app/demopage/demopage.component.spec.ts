import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GoogleAnalyticsEventsService } from '../services/google-analytics-events/google-analytics-events.service';

import { DemopageComponent } from './demopage.component';

describe('DemopageComponent', () => {
  let component: DemopageComponent;
  let fixture: ComponentFixture<DemopageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemopageComponent ],
      providers: [
        GoogleAnalyticsEventsService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemopageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
