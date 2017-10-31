import { TestBed, inject } from '@angular/core/testing';

import { SearchJobsCommonVariablesService } from './search-jobs-common-variables.service';

describe('SearchJobsCommonVariablesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchJobsCommonVariablesService]
    });
  });

  it('should be created', inject([SearchJobsCommonVariablesService], (service: SearchJobsCommonVariablesService) => {
    expect(service).toBeTruthy();
  }));
});
