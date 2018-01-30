import { TestBed, inject, async } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { PbapiKriterierService } from './pbapi-kriterier.service';
import { ProfilkriteriumTyper } from '../../models/ProfilkriteriumTyper';

describe('PbapiKriterierService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule
      ],      
      providers: [
        PbapiKriterierService
      ]
    });
  });

  it('should be created', inject([PbapiKriterierService], (service: PbapiKriterierService) => {
    expect(service).toBeTruthy();
  }));

  xit('should return the same type of search criteron types we believe exists', async(inject([PbapiKriterierService], (service: PbapiKriterierService) => {
    service.getKriterieTyper().then((result) => {
      expect(result).toEqual([
        'YRKEN',
        'YRKESGRUPPER',
        'KOMPETENSER',
        'UTBILDNINGSNIVAER',
        'UTBILDNINGSINRIKTNINGAR',
        'KORKORT',
        'SPRAK',
        'KOMMUNER',
        'ANSTALLNINGSTYPER',
        'LAN',
        'LANDER',
        'YRKESERFARENHETER',
        'SPRAKNIVAER',
        'INGA_KVALIFIKATIONER'
      ]);  
    });
  })));

  // Can't run these tests until the API is publicly available. Then do this with an access token.
  /*
  it('should always have values for all of the different return types of criteria', async(inject([PbapiKriterierService], (service: PbapiKriterierService) => {
    service.getKriterieTyper().then((typer) => {
      typer.forEach((type) => {
        expect(service.hasKriterierForType(type)).toBeFalsy();
        service.getKriterierForType(type).then((criteria) => {
          //console.log(type + ' hasCriteria: ' + service.hasKriterierForType(type) + ' size: ' + criteria.length);
          expect(service.hasKriterierForType(type)).toBeTruthy();
          expect(criteria.length).toBeGreaterThan(0);
        });
      });
    });
  })));
  */
  
});
