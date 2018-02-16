import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentSearchExpandComponent } from './component-search-expand.component';

describe('ComponentSearchExpandComponent', () => {
  let component: ComponentSearchExpandComponent;
  let fixture: ComponentFixture<ComponentSearchExpandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentSearchExpandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentSearchExpandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
