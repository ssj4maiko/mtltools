import { TestBed } from '@angular/core/testing';

import { NovelsService } from './novels.service';

describe('NovelsService', () => {
  let service: NovelsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NovelsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
