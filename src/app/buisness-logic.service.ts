import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BuisnessLogicService {

  constructor() { }

  /**
  * Get image path from weather description string 
  * @param mWeatherType 
  */
  public getWeatherIconFromAssetFolder(mWeatherType: string): string {

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
