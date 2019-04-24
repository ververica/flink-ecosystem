import { TestBed } from '@angular/core/testing';

import { PackagesService } from './packages.service';

describe('PackagesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PackagesService = TestBed.get(PackagesService);
    expect(service).toBeTruthy();
  });
});
