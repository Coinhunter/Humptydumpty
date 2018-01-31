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
  
});
