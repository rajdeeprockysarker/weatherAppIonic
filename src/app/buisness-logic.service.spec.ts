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
    expect(service.getWeatherBannerIconFromAssetFolder("scattered clouds","03n")).toEqual("../../assets/icon/scattered_clouds.png");
  });
});
