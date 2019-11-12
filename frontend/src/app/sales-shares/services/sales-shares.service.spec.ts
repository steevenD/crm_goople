import { TestBed } from '@angular/core/testing';

import { SalesSharesService } from './sales-shares.service';

describe('SalesSharesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SalesSharesService = TestBed.get(SalesSharesService);
    expect(service).toBeTruthy();
  });
});
