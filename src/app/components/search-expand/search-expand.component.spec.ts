import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchExpandComponent } from './search-expand.component';

describe('SearchExpandComponent', () => {
  let component: SearchExpandComponent;
  let fixture: ComponentFixture<SearchExpandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchExpandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchExpandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
