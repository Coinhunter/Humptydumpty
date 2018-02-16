import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValjFranListaComponent } from './valj-fran-lista.component';

describe('ValjFranListaComponent', () => {
  let component: ValjFranListaComponent;
  let fixture: ComponentFixture<ValjFranListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValjFranListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValjFranListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
