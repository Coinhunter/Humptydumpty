import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentSearchpackagesComponent } from './component-searchpackages.component';

describe('ComponentSearchpackagesComponent', () => {
  let component: ComponentSearchpackagesComponent;
  let fixture: ComponentFixture<ComponentSearchpackagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentSearchpackagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentSearchpackagesComponent);
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
