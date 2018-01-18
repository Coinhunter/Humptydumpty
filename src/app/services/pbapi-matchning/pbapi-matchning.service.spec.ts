import { TestBed, inject, async } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { PbapiMatchningService } from './pbapi-matchning.service';
import { IProfilkriterium } from '../../models/IProfilkriterium.interface';

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

  const criteria: Array<IProfilkriterium> = [
    {
      'namn': 'Stockholm',
      'varde': '0180',
      'typ': 'KOMMUN'
    }
  ];

  it('should be created', inject([PbapiMatchningService], (service: PbapiMatchningService) => {
    expect(service).toBeTruthy();
  }));

  it('should return a number from the API when calling getNumberOfAds()', async(inject([PbapiMatchningService], (service: PbapiMatchningService) => {
    service.getNumberOfAvailableJobs().then((res) => {
      expect(res).toBeDefined();
    });
  })));

  it('should fill the contract for getMatchingAds', async(inject([PbapiMatchningService], (service: PbapiMatchningService) => {
    service.getMatchingAds(criteria, 25, 0).then((res) => {
      expect(res).toBeDefined();
      expect(res.rekryteringsbehov).toBeDefined();

      expect(res.relateradeKriterier).toBeDefined();
      
      expect(res.antalRekryteringsbehov).toBeDefined();
      expect(res.antalPlatser).toBeDefined();

      expect(res.antalResultatRader).toBeDefined();

      expect(res.antalRekryteringsbehovMatcharExakt).toBeDefined();
      expect(res.antalRekryteringsbehovMatcharDelvis).toBeDefined();
    });
  })));

});
