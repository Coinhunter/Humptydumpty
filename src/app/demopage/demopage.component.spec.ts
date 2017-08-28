import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemopageComponent } from './demopage.component';

describe('DemopageComponent', () => {
  let component: DemopageComponent;
  let fixture: ComponentFixture<DemopageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemopageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemopageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
