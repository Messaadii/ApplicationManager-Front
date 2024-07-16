import { TestBed } from '@angular/core/testing';

import { VmserviceService } from './vmservice.service';

describe('VmserviceService', () => {
  let service: VmserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VmserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
