import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
/**
 * Inject to root of app
*/
@Injectable({
  providedIn: 'root'
})
/**
 * Service for Get JSON from URL
*/
export class RepositoryService {  
  

 /**
 * Constructor description
 * @param {HttpClient} http From angular/common/http
 */
  constructor(public http: HttpClient) { }


/**
 * Get five days Value
 * @param params CityName
 * @returns JSON Object or 'Error'
 */
  async getWeatherValueFiveDays(params:string) {  

    const mValue=await this.http.get('http://api.openweathermap.org/data/2.5/forecast?q='+params+'&APPID=d994b85acc1528b1a51fb0273b7ca7c4').toPromise().then(data => {      
      return data
    }, err => {
      console.log(err);
      return "Error"
    });

    return JSON.stringify(mValue)   
  
  }

  /**
   * Get Current value
   * @param params CityName
   * @returns JSON Object or 'Error'
   */
  async getWeatherValueCurrent(params:string) {  

    const mValue=await this.http.get('http://api.openweathermap.org/data/2.5//weather?q='+params+'&APPID=d994b85acc1528b1a51fb0273b7ca7c4').toPromise().then(data => {      
      return data
    }, err => {
      console.log(err);
      return "Error"
    });

    return JSON.stringify(mValue)   
  
  }

}
