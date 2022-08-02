import { TestBed } from '@angular/core/testing';

import { ChaptersService } from './chapters.service';

describe('ChaptersService', () => {
  let service: ChaptersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChaptersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
