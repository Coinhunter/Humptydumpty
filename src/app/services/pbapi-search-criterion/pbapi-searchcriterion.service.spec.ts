import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { PbapiSearchcriterionService } from './pbapi-searchcriterion.service';
import { SearchCriteriaTypes } from './SearchCriteriaTypes';

describe('PbapiSearchcriterionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule
      ],      
      providers: [
        PbapiSearchcriterionService
      ]
    });
  });

  it('should be created', inject([PbapiSearchcriterionService], (service: PbapiSearchcriterionService) => {
    expect(service).toBeTruthy();
  }));

  xit('should return the same type of search criteron types we believe exists', inject([PbapiSearchcriterionService], (service: PbapiSearchcriterionService) => {
    expect(service.getSearchCriteraTypes()).toEqual([
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
  }));

  
  it('should return an array of search criterias', inject([PbapiSearchcriterionService], (service: PbapiSearchcriterionService) => {
    service.getSearchCriteriaForType('YRKEN').subscribe((res) => {
      // Check some stuff...
      service.getSearchCriteriaForType('YRKEN').subscribe((res2) => {
        console.log('Already cached?');
      });
    });
  }));
  

});
