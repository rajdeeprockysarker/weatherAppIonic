import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {  
  
  public APPID:string="d994b85acc1528b1a51fb0273b7ca7c4";

constructor(public http: HttpClient) { }

async getVallue(params:string) {  

  const hjghj=await this.http.get('http://api.openweathermap.org/data/2.5/weather?q='+params+'&APPID='+this.APPID).toPromise().then(data => {
    
    return data
  });
  return JSON.stringify(hjghj)   
}

}
