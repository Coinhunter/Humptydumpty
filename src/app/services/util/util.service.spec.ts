import { TestBed, inject } from '@angular/core/testing';
import { UtilService } from './util.service';
import { Profilkriterium } from '../../models/Profilkriterium';

describe('UtilService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UtilService]
    });
  });

  it('should be created', inject([UtilService], (service: UtilService) => {
    expect(service).toBeTruthy();
  }));

  it('should output a proper url', inject([UtilService], (service: UtilService) => {
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

  it('should format number properly', inject([UtilService], (service: UtilService) => {
    expect(service.formatNumberOfJobs("123456")).toEqual("123 456");
    expect(service.formatNumberOfJobs("12345")).toEqual("12 345");
    expect(service.formatNumberOfJobs("1234")).toEqual("1 234");
    expect(service.formatNumberOfJobs("123")).toEqual("123");
    expect(service.formatNumberOfJobs("12")).toEqual("12");
    expect(service.formatNumberOfJobs("1")).toEqual("1");
  }));
  

});
