import { TestBed, inject, async } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { GeoapiService } from './geoapi.service';
import { Profilkriterium } from '../../models/Profilkriterium.interface';

describe('GeoapiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule
      ],            
      providers: [
        GeoapiService
      ]
    });
  });

  it('should be created', inject([GeoapiService], (service: GeoapiService) => {
    expect(service).toBeTruthy();
  }));

  it('should return some data', async(inject([GeoapiService], (service: GeoapiService) => {
    service.getOrtByPostnummer('532').then((result) => {
      expect(result).toBeDefined();
      expect(result.length).toBeGreaterThan(30);
    });
  })));

  

});
