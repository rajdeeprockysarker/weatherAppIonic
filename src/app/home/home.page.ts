import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RepositoryService } from '../repository.service';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})


export class HomePage {
  constructor(private http: HttpClient,public mRepositoryService:RepositoryService,private router: Router) {

    this.http.get('https://jsonplaceholder.typicode.com/todos/1').toPromise().then(data => {
      console.log(data);
    });
    this.getWeatherInfo();
  }

  async getWeatherInfo() {
    const hjghj=await this.mRepositoryService.getVallue("pune");
   // this.redirect(JSON.stringify(hjghj));

    console.log(JSON.stringify(hjghj));
   // console.log(JSON.parse(this.abc));
  }

}