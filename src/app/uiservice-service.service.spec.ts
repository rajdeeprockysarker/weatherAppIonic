import { TestBed } from '@angular/core/testing';

import { UIServiceServiceService } from './uiservice-service.service';

describe('UIServiceServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UIServiceServiceService = TestBed.get(UIServiceServiceService);
    expect(service).toBeTruthy();
  });
});
