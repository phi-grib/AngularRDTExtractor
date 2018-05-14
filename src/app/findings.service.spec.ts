import { TestBed, inject } from '@angular/core/testing';

import { FindingsService } from './findings.service';

describe('FindingsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FindingsService]
    });
  });

  it('should be created', inject([FindingsService], (service: FindingsService) => {
    expect(service).toBeTruthy();
  }));
});
