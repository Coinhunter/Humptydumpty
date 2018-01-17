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
});
