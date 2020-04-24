import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StringValueEnum} from './string-value-enum.enum';
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
   * Enum class object
   */
  mStringValueEnum;

 /**
 * Constructor description
 * @param {HttpClient} http From angular/common/http
 */
  constructor(public http: HttpClient) { 
      this.mStringValueEnum=StringValueEnum;
  }


/**
 * Get five days Value
 * @param params CityName
 * @returns JSON Object or 'Error'
 */
  async getWeatherValueFiveDays(params:string) {  

    const mValue=await this.http.get( this.mStringValueEnum.URLForcast+params+'&APPID='+this.mStringValueEnum.AppID).toPromise().then(data => {      
      return data
    }, err => {
      console.log(err);
      return err.statusText.toString();
    });

    return JSON.stringify(mValue)   
  
  }

  /**
   * Get Current value
   * @param params CityName
   * @returns JSON Object or 'Error'
   */
  async getWeatherValueCurrent(params:string) {  

    const mValue=await this.http.get(this.mStringValueEnum.URLCurrent+params+'&APPID='+this.mStringValueEnum.AppID).toPromise().then(data => {      
      return data
    }, err => {
      console.log(err);
      return  err.statusText.toString();
    });

    return JSON.stringify(mValue)   
  
  }

}
