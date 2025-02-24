import { TestBed } from '@angular/core/testing';

import { IdentityTriggersService } from './identity-triggers.service';

describe('IdentityTriggersService', () => {
  let service: IdentityTriggersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IdentityTriggersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
