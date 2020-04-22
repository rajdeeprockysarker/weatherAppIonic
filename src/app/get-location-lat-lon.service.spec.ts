import { TestBed } from '@angular/core/testing';

import { GetLocationLatLonService } from './get-location-lat-lon.service';

describe('GetLocationLatLonService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetLocationLatLonService = TestBed.get(GetLocationLatLonService);
    expect(service).toBeTruthy();
  });
});
