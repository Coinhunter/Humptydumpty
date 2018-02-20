import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SparadejobbComponent } from './sparadejobb.component';

describe('SparadejobbComponent', () => {
  let component: SparadejobbComponent;
  let fixture: ComponentFixture<SparadejobbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SparadejobbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SparadejobbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
