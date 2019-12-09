import { TestBed } from '@angular/core/testing';

import { PatinetSeviceService } from './patinet-sevice.service';

describe('PatinetSeviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PatinetSeviceService = TestBed.get(PatinetSeviceService);
    expect(service).toBeTruthy();
  });
});
