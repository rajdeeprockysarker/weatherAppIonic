import { Injectable } from '@angular/core';
import { TemperatureConverterService } from '../app/temperature-converter.service';

@Injectable({
  providedIn: 'root'
})
export class BuisnessLogicService {

  constructor(public mTemperatureConverterService:TemperatureConverterService) { }

  /**
  * Get image path from weather description string 
  * @param mWeatherType 
  */
  public getWeatherBannerIconFromAssetFolder(mWeatherType: string): string {

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


      default: {
        return "../../assets/images/clear_sky.png";
        break;
      }
    }

  }


   /**
  * Get image path from weather description string 
  * @param mWeatherType 
  */
 public getWeatherForcastIconFromAssetFolder(mWeatherType: string): string {

  switch (mWeatherType) {
   
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
      return "../../assets/images/01d.png";
      break;
    }
  }

}

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

public getNoOfDays(mFiveDaysValue){
  var mDate = [];
  for (let i = 0; i < JSON.parse(mFiveDaysValue).list.length; i++) {
    console.log(JSON.parse(mFiveDaysValue).list[i]);
    var mDateAfterAplit = (JSON.parse(mFiveDaysValue).list[i].dt_txt).split(" ")[0];   
    mDate.indexOf(mDateAfterAplit) === -1 ? mDate.push(mDateAfterAplit) : console.log();
  }
  return mDate;
}

public formatDateForDateAndMonth(mDate){
  var mFormatedDate=[];
  var monthNames = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];
  for (let i = 0; i < mDate.length; i++) {
  mFormatedDate.push(mDate[i].split("-")[2]+" "+monthNames[parseInt(mDate[i].split("-")[1])-1]);
  }
      return mFormatedDate;
}

public getDayOfWeek(mDate){
  var mFormatedDate=[];

 var dayNames = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
 for (let i = 0; i < mDate.length; i++) {
   if(i=0){
    mFormatedDate.push('Today');
   }
   else{
    const mDay = new Date(mDate[i]);
    const day = mDay.getDay();
    mFormatedDate.push(dayNames[day])
   }
 }
// Sunday - Saturday : 0 - 6

return mFormatedDate;
}

}
