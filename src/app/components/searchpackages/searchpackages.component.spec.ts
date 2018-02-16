import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchpackagesComponent } from './searchpackages.component';

describe('SearchpackagesComponent', () => {
  let component: SearchpackagesComponent;
  let fixture: ComponentFixture<SearchpackagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchpackagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchpackagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should return the first element in the search package array as the hero element', () => {
    expect(component.getHeroPackage()).toEqual(component.getJsonData()[0]);
  });

  it('should return the second and third elements in the as the hero companion elements', () => {
    expect(component.getHeroCompanionPackages()).toEqual([component.getJsonData()[1],component.getJsonData()[2]]);
  });

});
