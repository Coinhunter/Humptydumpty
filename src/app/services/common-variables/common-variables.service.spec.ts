import { TestBed, inject } from '@angular/core/testing';

import { CommonVariablesService } from './common-variables.service';

describe('CommonVariablesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommonVariablesService]
    });
  });

  it('should be created', inject([CommonVariablesService], (service: CommonVariablesService) => {
    expect(service).toBeTruthy();
  }));
});
