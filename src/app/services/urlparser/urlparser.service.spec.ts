import { TestBed, inject } from '@angular/core/testing';
import { UrlparserService } from './urlparser.service';
import { Profilkriterium } from '../../models/Profilkriterium';

describe('UrlparserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UrlparserService]
    });
  });

  it('should be created', inject([UrlparserService], (service: UrlparserService) => {
    expect(service).toBeTruthy();
  }));

  it('should output a proper url', inject([UrlparserService], (service: UrlparserService) => {
    const resultString = service.getUrlForCriteria([
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
    expect(resultString).toEqual('https://www.arbetsformedlingen.se/Tjanster/Arbetssokande/Platsbanken/?KOMMUNER=3;7&LAN=1;4&LANDER=2&SPRAK=6;9&YRKEN=5;8');
  }));

});