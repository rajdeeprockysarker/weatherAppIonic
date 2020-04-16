import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TemperatureConverterService {

  constructor() { }

  public kelvinToCelcius(params){
    return (params-273.15)
  }
}
