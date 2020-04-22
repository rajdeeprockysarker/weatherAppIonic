import { Component,ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RepositoryService } from '../repository.service';
import { Router, NavigationExtras } from '@angular/router';
import { UIServiceServiceService } from '../uiservice-service.service';
import { UIToastService } from '../uitoast.service';
import { TemperatureConverterService } from '../temperature-converter.service';
import { OverLapGraphForWeatherPredictionService } from '../over-lap-graph-for-weather-prediction.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})


export class HomePage {

  @ViewChild('lineCanvasMax', { static: true }) lineCanvasMax;
  @ViewChild('lineCanvasMin', { static: true }) lineCanvasMin;
  @ViewChild('lineCanvasBckGround', { static: true }) lineCanvasBckGround;

  mMonth = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  mData0 = [80, 80, 80, 80, 80, 80, 80, 80];
  mData1 = [50, 49, 48, 50, 49, 48, 46];
  mData2 = [41, 42, 40, 48, 45, 45, 41];
  mDate = [];
  mDateTempMax = [];
  mDateTempMin = [];
  maxTempof5DaysToGrphLimit=0;
  minTempof5DaysToraphLimit=0;
  mGraphMaxMinFromTempDelta=7;
  days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]



  barChart: any;
  doughnutChart: any;
  lineChartMax: any;
  lineChartMin: any;
  lineChartBckGround: any;

  mCity: string;
  mCurrentTemp: string;
  mWeather: string;
  mWind: string;
  mHumidity: string;
  


  mCurrentWeatherIcon:string;
  mFiveDaysWeatherIcon=[];



  constructor(public mRepositoryyAPIService: RepositoryService,
    public mUIServiceService: UIServiceServiceService,
    public mUIToastService: UIToastService,
    public mTemperatureConverterService: TemperatureConverterService,
    public mOverLapGraphForWeatherPredictionServiceMax: OverLapGraphForWeatherPredictionService,
    public mOverLapGraphForWeatherPredictionServiceMin: OverLapGraphForWeatherPredictionService,
    public mOverLapGraphForWeatherPredictionServiceBck: OverLapGraphForWeatherPredictionService,
    ) {

    
    this.loadFromUrl("Bengaluru");

  }




  async loadFromUrl(mCity: string) {

    this.mDate = [];
    this.mDateTempMax = [];
    this.mDateTempMin = [];

    this.mUIServiceService.showLoading("Loading...");
    const mFiveDaysValue = await this.mRepositoryyAPIService.getWeatherValueFiveDays(mCity);
    //console.log(mFiveDaysValue);
    if (JSON.parse(mFiveDaysValue) == "Error") {
      this.mUIServiceService.dismissLoading();
      this.mUIToastService.presentToast();
    }
    else {

      const mCurrentValue = await this.mRepositoryyAPIService.getWeatherValueCurrent(mCity);
      console.log(mCurrentValue);
      if (JSON.parse(mFiveDaysValue) == "Error") {
        this.mUIServiceService.dismissLoading();
        this.mUIToastService.presentToast();
      }
      else {

        this.mCity = JSON.parse(mCurrentValue).name+" , "+JSON.parse(mCurrentValue).sys.country;
        this.mCurrentTemp = Math.floor(this.mTemperatureConverterService.kelvinToCelcius((JSON.parse(mCurrentValue).main).temp)).toString() ;
        this.mWeather = (JSON.parse(mCurrentValue).weather)[0].description;
        this.mWind = (JSON.parse(mCurrentValue).wind).speed;
        this.mHumidity = (JSON.parse(mCurrentValue).main).humidity + "%";
        this.mCurrentWeatherIcon=this.getWeatherIconFromAssetFolder(JSON.parse(mCurrentValue).weather[0].description);

        ///// Insert Date into this.mDate Array
        for (let i = 0; i < JSON.parse(mFiveDaysValue).list.length; i++) {
          console.log(JSON.parse(mFiveDaysValue).list[i]);
          var mDateAfterAplit = (JSON.parse(mFiveDaysValue).list[i].dt_txt).split(" ")[0];
          this.mDate.indexOf(mDateAfterAplit) === -1 ? this.mDate.push(mDateAfterAplit) : console.log();
        }

        /////// getHigh Log Temp Of Each Day /////
        for (let i = 0; i < this.mDate.length; i++) {
          console.log(this.mDate[i]);

          var mHeigh = 0;
          var mLow = 0;
          var mWeatherIcon="";

          for (let j = 0; j < JSON.parse(mFiveDaysValue).list.length; j++) {
            var mDateAfterAplit = (JSON.parse(mFiveDaysValue).list[j].dt_txt).split(" ")[0];
            if (mDateAfterAplit == this.mDate[i]) {
              if (mHeigh == 0 && mLow == 0) {
                mHeigh = JSON.parse(mFiveDaysValue).list[j].main.temp_max;
                mWeatherIcon=this.getWeatherIconFromAssetFolder(JSON.parse(mFiveDaysValue).list[j].weather[0].icon);
                mLow = JSON.parse(mFiveDaysValue).list[j].main.temp_min;
                continue;
              }
              else {
                if (mHeigh < JSON.parse(mFiveDaysValue).list[j].main.temp_max) {
                  mHeigh = JSON.parse(mFiveDaysValue).list[j].main.temp_max;
                  mWeatherIcon=this.getWeatherIconFromAssetFolder(JSON.parse(mFiveDaysValue).list[j].weather[0].icon);
                }
                if (mLow > JSON.parse(mFiveDaysValue).list[j].main.temp_min) {
                  mLow = JSON.parse(mFiveDaysValue).list[j].main.temp_min;
                }
              }

            }

          }

          this.mDateTempMax.push(Math.floor(this.mTemperatureConverterService.kelvinToCelcius(mHeigh)));
          this.mDateTempMin.push(Math.floor(this.mTemperatureConverterService.kelvinToCelcius(mLow)));
          this.mFiveDaysWeatherIcon.push(mWeatherIcon);

          console.log(this.mTemperatureConverterService.kelvinToCelcius(mHeigh)
            + "     " + this.mTemperatureConverterService.kelvinToCelcius(mLow));


        }


        console.log("Graph Calling");
        // this.mShowGraphService.showGrapg(this.lineChart,this.lineCanvas,this.mDate,
        //   this.mDateTempMax,this.mDateTempMin);

        //   this.mShowGraphService.showGrapg(this.lineChart,this.lineCanvastwo,this.mDate,
        //     this.mDateTempMax,this.mDateTempMin);

         this.maxTempof5DaysToGrphLimit=Math.max(...this.mDateTempMax)+this.mGraphMaxMinFromTempDelta;
         this.minTempof5DaysToraphLimit=Math.min(...this.mDateTempMin)-this.mGraphMaxMinFromTempDelta;


        this.mOverLapGraphForWeatherPredictionServiceMax.showGrapg(this.lineChartMax, this.lineCanvasMax, this.mDate,
          this.mDateTempMax, 'Highest', 'rgba(225,217,104)',this.minTempof5DaysToraphLimit
          ,this.maxTempof5DaysToGrphLimit);

        this.mOverLapGraphForWeatherPredictionServiceMin.showGrapg(this.lineChartMin, this.lineCanvasMin, this.mDate
          , this.mDateTempMin, 'Lowest', 'rgba(15,148,225)',this.minTempof5DaysToraphLimit
          ,this.maxTempof5DaysToGrphLimit);

          this.mOverLapGraphForWeatherPredictionServiceBck.showGrapg(this.lineChartBckGround, this.lineCanvasBckGround, this.mDate
            , [this.maxTempof5DaysToGrphLimit,this.maxTempof5DaysToGrphLimit,
               this.maxTempof5DaysToGrphLimit,this.maxTempof5DaysToGrphLimit,
               this.maxTempof5DaysToGrphLimit,this.maxTempof5DaysToGrphLimit], 
               '', 'rgba(15,148,225)',this.minTempof5DaysToraphLimit,
               this.maxTempof5DaysToGrphLimit);

          console.log(Math.max(...this.mDateTempMax)+"   "+Math.min(...this.mDateTempMin))

      }
    }
    this.mUIServiceService.dismissLoading();

  }

  public getWeatherIconFromAssetFolder(mWeatherType:string):string{

    switch (mWeatherType) {
      case "clear sky": {
         return "../../assets/images/clear_sky.png";
         break;
      }
     
      case "few clouds": {
        return "../../assets/images/few_clouds.png";
         break;
      }
     
      case "scattered clouds": {
        return "../../assets/images/scattered_clouds.png";
         break;
      }
     
      case "broken clouds": {
        return "../../assets/images/broken_clouds.png";
         break;
      }
      case "shower rain": {
        return "../../assets/images/shower_rain.png";
        break;
     }
      case "rain": {
        return "../../assets/images/rain.png";
        break;
     }
      case "snow": {
        return "../../assets/images/snow.png";
        break;
     }

     case "mist": {
      return "../../assets/images/mist.png";
      break;
   }
   case "mist": {
    return "../../assets/images/mist.png";
    break;
 }
 
 case "01d": {
  return "../../assets/images/01d.png";
  break;
}
  
case "02d": {
  return "../../assets/images/02d.png";
  break;
}
case "03d": {
  return "../../assets/images/03d.png";
  break;
}

case "04d": {
  return "../../assets/images/04d.png";
  break;
}
case "09d": {
  return "../../assets/images/09d.png";
  break;
}
case "10d": {
  return "../../assets/images/10d.png";
  break;
}
case "11d": {
  return "../../assets/images/11d.png";
  break;
}
case "13d": {
  return "../../assets/images/13d.png";
  break;
}
case "50d": {
  return "../../assets/images/50d.png";
  break;
}
default: {
        return "../../assets/images/clear_sky.png";
         break;
      }
   }

  }


}