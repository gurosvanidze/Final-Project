import { TestBed } from '@angular/core/testing';

import { ApiAlbumsService } from './api.albums.service';

describe('ApiAlbumsService', () => {
  let service: ApiAlbumsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiAlbumsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
