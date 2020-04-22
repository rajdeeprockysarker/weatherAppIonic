import { TestBed } from '@angular/core/testing';

import { BuisnessLogicService } from './buisness-logic.service';

describe('BuisnessLogicService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BuisnessLogicService = TestBed.get(BuisnessLogicService);
    expect(service).toBeTruthy();
  });
  it('Check methods', () => {
    const service: BuisnessLogicService = TestBed.get(BuisnessLogicService);
    expect(service.getWeatherIconFromAssetFolder("scattered clouds")).toEqual("../../assets/images/scattered_clouds.png");
  });
});
