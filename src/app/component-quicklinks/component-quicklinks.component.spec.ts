import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentQuicklinksComponent } from './component-quicklinks.component';

import { Profilkriterium } from '../models/Profilkriterium';


describe('ComponentQuicklinksComponent', () => {
  let component: ComponentQuicklinksComponent;
  let fixture: ComponentFixture<ComponentQuicklinksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentQuicklinksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentQuicklinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should output a proper url', () => {
    const resultString = component.getUrlForCriteria(
      [
        new Profilkriterium('1', '1', 'LAN'),
        new Profilkriterium('2', '1', 'LANDER'),
        new Profilkriterium('3', '1', 'KOMMUNER'),
        new Profilkriterium('4', '1', 'LAN'),
        new Profilkriterium('5', '1', 'YRKEN'),
        new Profilkriterium('6', '1', 'SPRAK'),
        new Profilkriterium('7', '1', 'KOMMUNER'),
        new Profilkriterium('8', '1', 'YRKEN'),
        new Profilkriterium('9', '1', 'SPRAK'),
      ]);
    
    console.log(resultString);

    expect(resultString).toEqual('?KOMMUNER=3;7&LAN=1;4&LANDER=2&SPRAK=6;9&YRKEN=5;8');
    
  })

});
