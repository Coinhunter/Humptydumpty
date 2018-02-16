import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectedcommunicationComponent } from './directedcommunication.component';

describe('ComponentDirectedcommunicationComponent', () => {
  let component: DirectedcommunicationComponent;
  let fixture: ComponentFixture<DirectedcommunicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectedcommunicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectedcommunicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
