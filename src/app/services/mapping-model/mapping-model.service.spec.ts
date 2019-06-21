import { TestBed } from '@angular/core/testing';

import { MappingModelService } from './mapping-model.service';

describe('MappingModelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MappingModelService = TestBed.get(MappingModelService);
    expect(service).toBeTruthy();
  });
});
