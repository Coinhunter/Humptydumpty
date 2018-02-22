import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValjYrkeFranListaComponent } from './valj-yrke-fran-lista.component';

describe('ValjYrkeFranListaComponent', () => {
  let component: ValjYrkeFranListaComponent;
  let fixture: ComponentFixture<ValjYrkeFranListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValjYrkeFranListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValjYrkeFranListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
