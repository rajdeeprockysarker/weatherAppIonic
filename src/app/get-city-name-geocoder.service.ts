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
 * Service for Get City information
*/
export class GetCityNameGeocoderService {
/**
 * Store address
 */
  geoAddress:string;
/**
 * Constractor of GetCityNameGeocoderService Service
 * @param platform To get platform application run on
 * @param geolocation Geolocation service
 * @param nativeGeocoder NativeGeocoder service
 */
  constructor(public platform: Platform,
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder) { }
/**
 * Create NativeGeocoderOptions 
 */
    options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };
/**
 * Get Address
 * @param latitude Geo latitude
 * @param longitude Geo longitude
 */
    async getGeolocation(latitude,longitude):Promise<string> {     
   
        await this.nativeGeocoder.reverseGeocode(latitude, longitude, this.options)
        .then((result: NativeGeocoderResult[]) => {
          this.geoAddress = result[0].locality+','+
          result[0].countryCode;         
        })
        .catch((error: any) => {
          this.geoAddress ='Error'; 
        });
    

  
         return this.geoAddress;
        
      }


  /**
   * Return Address
   * @param addressObj Json Object
   */
  //Return Comma saperated address
  public generateAddress(addressObj){
    let obj = [];
    let address = "";
    for (let key in addressObj) {
      obj.push(addressObj[key]);
    }
    obj.reverse();
    for (let val in obj) {
      if(obj[val].length)
      address += val+' '+obj[val]+', ';
    }
  return address.slice(0, -2);
}
        
    
}
