import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValjPlatsFranListaComponent } from './valj-plats-fran-lista.component';

describe('ValjPlatsFranListaComponent', () => {
  let component: ValjPlatsFranListaComponent;
  let fixture: ComponentFixture<ValjPlatsFranListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValjPlatsFranListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValjPlatsFranListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
