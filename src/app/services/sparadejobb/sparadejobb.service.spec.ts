import { TestBed, inject } from '@angular/core/testing';

import { SparadejobbService } from './sparadejobb.service';

describe('SparadejobbService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SparadejobbService]
    });
  });

  it('should be created', inject([SparadejobbService], (service: SparadejobbService) => {
    expect(service).toBeTruthy();
  }));
});
