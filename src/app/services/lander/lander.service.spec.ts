import { TestBed, inject } from '@angular/core/testing';

import { LanderService } from './lander.service';

describe('LanderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LanderService]
    });
  });

  it('should be created', inject([LanderService], (service: LanderService) => {
    expect(service).toBeTruthy();
  }));
});
