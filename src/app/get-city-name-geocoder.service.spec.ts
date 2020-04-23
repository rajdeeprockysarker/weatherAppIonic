import { TestBed } from '@angular/core/testing';

import { GetCityNameGeocoderService } from './get-city-name-geocoder.service';
import { Platform } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';

describe('GetCityNameGeocoderService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [     
      Platform,
      Geolocation,
      NativeGeocoder
  ]
  }));

  it('should be created', () => {
    const service: GetCityNameGeocoderService = TestBed.get(GetCityNameGeocoderService);
    expect(service).toBeTruthy();
  });
});
