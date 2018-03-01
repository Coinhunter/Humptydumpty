import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PbAutocompleteComponent } from './pb-autocomplete.component';

describe('PbAutocompleteComponent', () => {
  let component: PbAutocompleteComponent;
  let fixture: ComponentFixture<PbAutocompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PbAutocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PbAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
