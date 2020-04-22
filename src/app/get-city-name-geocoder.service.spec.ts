import { TestBed } from '@angular/core/testing';

import { GetCityNameGeocoderService } from './get-city-name-geocoder.service';

describe('GetCityNameGeocoderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetCityNameGeocoderService = TestBed.get(GetCityNameGeocoderService);
    expect(service).toBeTruthy();
  });
});
