import { Injectable } from '@angular/core';
import { TemperatureConverterService } from '../app/temperature-converter.service';
/**
 * Inject to root of app
*/
@Injectable({
  providedIn: 'root'
})
/**
 * Buisness Logic for HomePage.ts
*/
export class BuisnessLogicService {

 /**
 * Constructor of BuisnessLogicService
 * @param {TemperatureConverterService} mTemperatureConverterService Convert Temperature Service
 */
  constructor(public mTemperatureConverterService:TemperatureConverterService) { }
/**
 * Declare url for image fetch from server
 */
  url:string="http://openweathermap.org/img/w/";
  /**
  * Get image path from weather description string 
  * @param mWeatherType String
  * @param icon
  * @returns Image local path or image URL path
  */
  public getWeatherBannerIconFromAssetFolder(mWeatherType: string,icon:string): string {

    switch (mWeatherType) {
      case "clear sky": {
        return "../../assets/icon/clear_sky.png";
        break;
      }

      case "few clouds": {
        return "../../assets/icon/few_clouds.png";
        break;
      }
      case "few clouds night": {
        return "../../assets/icon/Few_Clouds_night.png";
        break;
      }

      case "scattered clouds": {
        return "../../assets/icon/scattered_clouds.png";
        break;
      }

      case "broken clouds": {
        return "../../assets/icon/broken_clouds.png";
        break;
      }
      case "shower rain": {
        return "../../assets/icon/shower_rain.png";
        break;
      }
      case "rain": {
        return "../../assets/icon/rain.png";
        break;
      }
      case "rain night": {
        return "../../assets/icon/Rain_night.png";
        break;
      }

      case "shower rain": {
        return "../../assets/icon/shower_rain.png";
        break;
      }
      case "snow": {
        return "../../assets/icon/snow.png";
        break;
      }

      case "mist": {
        return "../../assets/icon/mist.png";
        break;
      }
      case "thunderstorm": {
        return "../../assets/icon/thunderstorm.png";
        break;
      }
      case "cleat sky night": {
        return "../../assets/icon/cleat_sky_night.png";
        break;
      }
      case "few clouds night": {
        return "../../assets/icon/few-Clouds_night.png";
        break;
      }
      case "rain night": {
        return "../../assets/icon/rain_night.png";
        break;
      }


      default: {
        return this.url+icon+".png";
        break;
      }
    }

  }


   /**
  * Get image path from weather description string 
  * @param mWeatherType 
  * @returns Image local path 
  */
 public getWeatherForcastIconFromAssetFolder(mWeatherType: string): string {

  switch (mWeatherType) {
   
    case "01d": {
      return "../../assets/icon/01d.png";
      break;
    }
    case "01n": {
      return "../../assets/icon/01n.png";
      break;
    }

    case "02d": {
      return "../../assets/icon/02d.png";
      break;
    }
    case "02n": {
      return "../../assets/icon/02n.png";
      break;
    }
    case "03d": {
      return "../../assets/icon/03d.png";
      break;
    }

    case "04d": {
      return "../../assets/icon/04d.png";
      break;
    }
    case "09d": {
      return "../../assets/icon/09d.png";
      break;
    }
    case "10d": {
      return "../../assets/icon/10d.png";
      break;
    }
    case "10n": {
      return "../../assets/icon/10n.png";
      break;
    }
    case "11d": {
      return "../../assets/icon/11d.png";
      break;
    }
    case "13d": {
      return "../../assets/icon/13d.png";
      break;
    }
    case "50d": {
      return "../../assets/icon/50d.png";
      break;
    }
    default: {
      return "../../assets/icon/01d.png";
      break;
    }
  }

}
/**
 * Get morethan one days forcast
 * @param mDate Days in YYYU-MM-DD format
 * @param mFiveDaysValue Json value
 * @returns Get Five days value to render graph
 */
public getFiveDaysValueInFormat(mDate,mFiveDaysValue){
  var mDateTempMax = [];
  var mDateTempMin = [];
  var mFiveDaysWeatherIcon=[];

  var totlReturn=[];
        /////// getHigh Log Temp Of Each Day /////
        for (let i = 0; i < mDate.length; i++) {
          console.log(mDate[i]);

          var mHeigh = 0;
          var mLow = 0;
          var mWeatherIcon="";

          for (let j = 0; j < JSON.parse(mFiveDaysValue).list.length; j++) {
            var mDateAfterAplit = (JSON.parse(mFiveDaysValue).list[j].dt_txt).split(" ")[0];
            if (mDateAfterAplit == mDate[i]) {
              if (mHeigh == 0 && mLow == 0) {
                mHeigh = JSON.parse(mFiveDaysValue).list[j].main.temp_max;
                mWeatherIcon=this.getWeatherForcastIconFromAssetFolder(JSON.parse(mFiveDaysValue).list[j].weather[0].icon);
                mLow = JSON.parse(mFiveDaysValue).list[j].main.temp_min;
                continue;
              }
              else {
                if (mHeigh < JSON.parse(mFiveDaysValue).list[j].main.temp_max) {
                  mHeigh = JSON.parse(mFiveDaysValue).list[j].main.temp_max;
                  mWeatherIcon=this.getWeatherForcastIconFromAssetFolder(JSON.parse(mFiveDaysValue).list[j].weather[0].icon);
                }
                if (mLow > JSON.parse(mFiveDaysValue).list[j].main.temp_min) {
                  mLow = JSON.parse(mFiveDaysValue).list[j].main.temp_min;
                }
              }

            }

          }

          mDateTempMax.push(Math.floor(this.mTemperatureConverterService.kelvinToCelcius(mHeigh)));
          mDateTempMin.push(Math.floor(this.mTemperatureConverterService.kelvinToCelcius(mLow)));
          mFiveDaysWeatherIcon.push(mWeatherIcon);

          // console.log(this.mTemperatureConverterService.kelvinToCelcius(mHeigh)
          //   + "     " + this.mTemperatureConverterService.kelvinToCelcius(mLow));


        }

        totlReturn.push(mDateTempMax);
        totlReturn.push(mDateTempMin);
        totlReturn.push(mFiveDaysWeatherIcon);

        return totlReturn;
}
/**
 * Get Occurance of date
 * @param mFiveDaysValue Json value
 *  @returns Occurance of date
 */
public getNoOfDays(mFiveDaysValue){
  var mDate = [];
  for (let i = 0; i < JSON.parse(mFiveDaysValue).list.length; i++) {
    console.log(JSON.parse(mFiveDaysValue).list[i]);
    var mDateAfterAplit = (JSON.parse(mFiveDaysValue).list[i].dt_txt).split(" ")[0];   
    mDate.indexOf(mDateAfterAplit) === -1 ? mDate.push(mDateAfterAplit) : console.log();
  }
  return mDate;
}
/**
 *  Return as 'DD Month Name' format 
 * @param mDate Dates in YYYY-MM-DD format
 * @returns Formated date and month
 */
public formatDateForDateAndMonth(mDate){
  var mFormatedDate=[];
  var monthNames = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];
  for (let i = 0; i < mDate.length; i++) {
  mFormatedDate.push(mDate[i].split("-")[2]+" "+monthNames[parseInt(mDate[i].split("-")[1])-1]);
  }
      return mFormatedDate;
}
/**
 * Return Day of Week
 * @param mDate Dates in YYYY-MM-DD format
 * @returns Day of Week
 */
public getDayOfWeek(mDateinDay){
  var mFormatedDate=[];

 var dayNames = [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
 mFormatedDate.push("Today");
 let k=mDateinDay+1;
  for (let i=0;i<6;i++){
      if(k==7){
          k=0;
      }
      else{
        mFormatedDate.push(dayNames[k++]);
      }
  } 

return mFormatedDate;
}

}
