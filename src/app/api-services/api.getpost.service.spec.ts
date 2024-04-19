import { TestBed } from '@angular/core/testing';

import { ApiGetpostService } from './api.getpost.service';

describe('ApiGetpostService', () => {
  let service: ApiGetpostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiGetpostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
