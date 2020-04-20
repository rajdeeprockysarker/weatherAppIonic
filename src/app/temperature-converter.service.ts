import { Injectable } from '@angular/core';
/**
 * Inject to root of app
*/
@Injectable({
  providedIn: 'root'
})
/**
 * Service for Temperature Converter
*/
export class TemperatureConverterService {

  /**
   * @ignore
   */
  constructor() { }

  /**
   * Convert from Kelvin to Celcius
   * @param params Kelvin temperature
   */
  public kelvinToCelcius(params){
    return (params-273.15)
  }
}
