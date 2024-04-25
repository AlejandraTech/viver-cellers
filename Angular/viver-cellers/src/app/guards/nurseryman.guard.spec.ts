import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { nurserymanGuard } from './nurseryman.guard';

describe('nurserymanGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => nurserymanGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
