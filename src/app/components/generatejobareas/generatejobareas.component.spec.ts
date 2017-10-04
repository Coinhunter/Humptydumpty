import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratejobareasComponent } from './generatejobareas.component';

describe('GeneratejobareasComponent', () => {
  let component: GeneratejobareasComponent;
  let fixture: ComponentFixture<GeneratejobareasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneratejobareasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneratejobareasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
