import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratecountriesComponent } from './generatecountries.component';

describe('GeneratecountriesComponent', () => {
  let component: GeneratecountriesComponent;
  let fixture: ComponentFixture<GeneratecountriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneratecountriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneratecountriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
