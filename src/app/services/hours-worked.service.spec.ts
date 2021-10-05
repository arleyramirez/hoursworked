import { TestBed } from '@angular/core/testing';

import { HoursWorkedService } from './hours-worked.service';

describe('HoursWorkedService', () => {
  let service: HoursWorkedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HoursWorkedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
