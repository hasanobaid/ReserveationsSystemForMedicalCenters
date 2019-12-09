import { TestBed } from '@angular/core/testing';

import { AppoinmentServiceService } from './appoinment-service.service';

describe('AppoinmentServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppoinmentServiceService = TestBed.get(AppoinmentServiceService);
    expect(service).toBeTruthy();
  });
});
