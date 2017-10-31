import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowadComponent } from './showad.component';

describe('ShowadComponent', () => {
  let component: ShowadComponent;
  let fixture: ComponentFixture<ShowadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
