import { TestBed } from '@angular/core/testing';

import { GetLocationLatLonService } from './get-location-lat-lon.service';
import { Platform } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';

describe('GetLocationLatLonService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [     
      Platform,
      Geolocation,
      NativeGeocoder
  ]
  }));

  it('should be created', () => {
    const service: GetLocationLatLonService = TestBed.get(GetLocationLatLonService);
    expect(service).toBeTruthy();
  });
});
