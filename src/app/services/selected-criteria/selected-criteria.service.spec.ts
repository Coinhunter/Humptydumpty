import { TestBed, inject } from '@angular/core/testing';

import { SelectedCriteriaService } from './selected-criteria.service';

describe('SelectedCriteriaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SelectedCriteriaService]
    });
  });

  it('should be created', inject([SelectedCriteriaService], (service: SelectedCriteriaService) => {
    expect(service).toBeTruthy();
  }));
});
