import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';

/**
 * Inject to root of app
*/
@Injectable({
  providedIn: 'root'
})
/**
 * Service for Get Lat and Lon
*/
export class GetLocationLatLonService {
  /**
   * Geo latitude
   */
  geoLatitude: number;
  /**
   * Geo longitude
   */
  geoLongitude: number;
  /**
   * Geo accuracy
   */
  geoAccuracy:number;

  /**
   * Constractor of GetLocationLatLon Service
   * @constructor GetLocationLatLonService
   * @param platform To get platform application run on
   * @param geolocation Geolocation service
   * @param nativeGeocoder NativeGeocoder service
   */

  constructor(public platform: Platform,
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder) { }

    /**
     * Async task for get platform and get lat,lon
     * @returns Promise<string>
     */
   async getGeolocation():Promise<string> {
    if (this.platform.is('android') || this.platform.is('ios')) {
      await this.geolocation.getCurrentPosition().then((resp) => {
        this.geoLatitude = resp.coords.latitude;
        this.geoLongitude = resp.coords.longitude; 
        this.geoAccuracy = resp.coords.accuracy;       
       }).catch((error) => {
       // this.geoAddress ='Error getting location'+ JSON.stringify(error);  
       return  'Error';
       });
      }
      else{
        return 'Error';
      }

       return (this.geoLatitude).toString()+"---"+(this.geoLongitude).toString();
      
    }
  
}
