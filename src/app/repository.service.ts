import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {  
  

  public a:string="asdfghjkl";

  constructor(public http: HttpClient) { }

  async getVallue(params:string) {  

    const hjghj=await this.http.get('https://corona.lmao.ninja/'+params).toPromise().then(data => {      
      return data
    }, err => {
      console.log(err);
      return "Error"
    });

    return JSON.stringify(hjghj)   
  
  }

  async getWeatherValueFiveDays(params:string) {  

    const hjghj=await this.http.get('http://api.openweathermap.org/data/2.5/forecast?q='+params+'&APPID=d994b85acc1528b1a51fb0273b7ca7c4').toPromise().then(data => {      
      return data
    }, err => {
      console.log(err);
      return "Error"
    });

    return JSON.stringify(hjghj)   
  
  }
  async getWeatherValueCurrent(params:string) {  

    const hjghj=await this.http.get('http://api.openweathermap.org/data/2.5//weather?q='+params+'&APPID=d994b85acc1528b1a51fb0273b7ca7c4').toPromise().then(data => {      
      return data
    }, err => {
      console.log(err);
      return "Error"
    });

    return JSON.stringify(hjghj)   
  
  }

}
