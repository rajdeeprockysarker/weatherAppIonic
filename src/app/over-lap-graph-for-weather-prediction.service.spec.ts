import { TestBed } from '@angular/core/testing';

import { OverLapGraphForWeatherPredictionService } from './over-lap-graph-for-weather-prediction.service';

describe('OverLapGraphForWeatherPredictionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OverLapGraphForWeatherPredictionService = TestBed.get(OverLapGraphForWeatherPredictionService);
    expect(service).toBeTruthy();
  });
});
