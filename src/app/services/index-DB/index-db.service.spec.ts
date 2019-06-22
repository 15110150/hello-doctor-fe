import { TestBed } from '@angular/core/testing';

import { IndexDBService } from './index-db.service';

describe('IndexDBService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IndexDBService = TestBed.get(IndexDBService);
    expect(service).toBeTruthy();
  });
});
