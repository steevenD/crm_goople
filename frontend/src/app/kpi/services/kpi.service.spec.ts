import { TestBed } from '@angular/core/testing';

import { KpiService } from './kpi.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('KpiService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: KpiService = TestBed.get(KpiService);
    expect(service).toBeTruthy();
  });
});
