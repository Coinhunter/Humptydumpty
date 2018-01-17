import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentDirectedcommunicationComponent } from './component-directedcommunication.component';

describe('ComponentDirectedcommunicationComponent', () => {
  let component: ComponentDirectedcommunicationComponent;
  let fixture: ComponentFixture<ComponentDirectedcommunicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentDirectedcommunicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentDirectedcommunicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
