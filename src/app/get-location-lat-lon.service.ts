import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';


@Injectable({
  providedIn: 'root'
})
export class GetLocationLatLonService {
  geoLatitude: number;
  geoLongitude: number;
  geoAccuracy:number;

  constructor(public platform: Platform,
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder) { }

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
