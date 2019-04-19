import { TestBed } from '@angular/core/testing';

import { FakeShopService } from './fake-shop.service';

describe('FakeShopService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FakeShopService = TestBed.get(FakeShopService);
    expect(service).toBeTruthy();
  });
});
