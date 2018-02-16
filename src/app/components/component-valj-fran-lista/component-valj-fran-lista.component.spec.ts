import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentValjFranListaComponent } from './component-valj-fran-lista.component';

describe('ComponentValjFranListaComponent', () => {
  let component: ComponentValjFranListaComponent;
  let fixture: ComponentFixture<ComponentValjFranListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentValjFranListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentValjFranListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
