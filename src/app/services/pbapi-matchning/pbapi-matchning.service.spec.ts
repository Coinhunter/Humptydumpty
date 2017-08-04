import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { PbapiMatchningService } from './pbapi-matchning.service';

describe('PbapiMatchningService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule
      ],      
      providers: [
        PbapiMatchningService
      ]
    });
  });

  it('should be created', inject([PbapiMatchningService], (service: PbapiMatchningService) => {
    expect(service).toBeTruthy();
  }));

  it('should return a number from the API when calling getNumberOfAds()', inject([PbapiMatchningService], (service: PbapiMatchningService) => {
    service.getNumberOfAvailableJobs().subscribe((res) => {
      expect(res).toBeDefined(); 
    });
  }));

  it('should fill the contract for getMatchingAds', inject([PbapiMatchningService], (service: PbapiMatchningService) => {
    service.getMatchingAds([]).subscribe((res) => {
      expect(res.rekryteringsbehov).toBeDefined();

      expect(res.relateradeKriterier).toBeDefined();
      
      expect(res.antalRekryteringsbehov).toBeDefined();
      expect(res.antalPlatser).toBeDefined();

      expect(res.antalResultatRader).toBeDefined();

      expect(res.antalRekryteringsbehovMatcharExakt).toBeDefined();
      expect(res.antalRekryteringsbehovMatcharDelvis).toBeDefined();
    });
  }));
});
