import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentQuicklinksComponent } from './component-quicklinks.component';

describe('ComponentQuicklinksComponent', () => {
  let component: ComponentQuicklinksComponent;
  let fixture: ComponentFixture<ComponentQuicklinksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentQuicklinksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentQuicklinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

});
