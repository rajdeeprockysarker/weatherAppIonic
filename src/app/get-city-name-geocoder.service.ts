import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';


@Injectable({
  providedIn: 'root'
})
export class GetCityNameGeocoderService {

  geoAddress:string;

  constructor(public platform: Platform,
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder) { }

    options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };

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
