import { TestBed } from '@angular/core/testing';

import { TemperatureConverterService } from './temperature-converter.service';

describe('TemperatureConverterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TemperatureConverterService = TestBed.get(TemperatureConverterService);
    expect(service).toBeTruthy();
  });
});
