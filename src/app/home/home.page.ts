import { Component,ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RepositoryService } from '../repository.service';
import { Router, NavigationExtras } from '@angular/router';
import { UIServiceServiceService } from '../uiservice-service.service';
import { UIToastService } from '../uitoast.service';
import { TemperatureConverterService } from '../temperature-converter.service';
import { OverLapGraphForWeatherPredictionService } from '../over-lap-graph-for-weather-prediction.service';
import { BuisnessLogicService } from '../buisness-logic.service';
import { GetLocationLatLonService } from '../get-location-lat-lon.service';
import { GetCityNameGeocoderService } from '../get-city-name-geocoder.service';


/**
 * Component for HomePage.ts
 */
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

/**
 * HomePage class
 */
export class HomePage {
/**
 * lineCanvasMax = Max Line Graph
 */
  @ViewChild('lineCanvasMax', { static: true }) lineCanvasMax;
/**
 * lineCanvasMin = Min Line Graph
 */
  @ViewChild('lineCanvasMin', { static: true }) lineCanvasMin;
/**
 * lineCanvasBckGround = Background Graph
 */
  @ViewChild('lineCanvasBckGround', { static: true }) lineCanvasBckGround;

/**
 * Store 5 days Date
 */
  mDate = [];

/**
 * Store 5 days Date
 */
mDateForGraphRenderOnly = [];

/**
 * Store 5 days Date
 */
mDateNameForGraphRenderOnly = [];

/**
 * Store 5 days Max Temperature
 */  
  mDateTempMax = [];
/**
 * Store 5 days Min Temperature
 */ 
  mDateTempMin = [];
/**
 * Store Max Temperature in next 5 days
 */ 
  maxTempof5DaysToGrphLimit=0;
/**
 * Store Min Temperature in next 5 days
 */
  minTempof5DaysToraphLimit=0;
/**
 * Value of delta for graph for resizing
 */
  mGraphMaxMinFromTempDelta=7;
/**
 * Store static value for vwetical scroll
 */
  days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]
  /**
 * Today In Date Count
 */
  mDateinDay=0;

/**
 * Max Chart Graph
 */
  lineChartMax: any;
/**
 * Min Chart Graph
 */  
  lineChartMin: any;
/**
 * Background Chart Graph
 */  
  lineChartBckGround: any;

/**
 * City Name 
 */  
  mCity: string;
/**
 * Current Temperature 
 */ 
  mCurrentTemp: string;
/**
 * Current Weather Description 
 */ 
  mWeather: string;
/**
 * Current Wind Speed
 */  
  mWind: string;
/**
 * Current Humidity
 */ 
  mHumidity: string;
  

/**
 * Current weather icon
 */ 
  mCurrentWeatherIcon:string;
/**
 * Store five days icon
 */   
  mFiveDaysWeatherIcon=[];

/**
 * InputFrom SearchBox
 */
inputFromSearchBox: string = "";


/**
 * Constructor for Homepage.ts
 * @param mRepositoryyAPIService Instance of RepositoryyAPIService
 * @param mUIServiceService Instance of UIServiceService
 * @param mUIToastService Instance of UIToastService
 * @param mTemperatureConverterService Instance of TemperatureConverterService
 * @param mOverLapGraphForWeatherPredictionServiceMax Instance of OverLapGraphForWeatherPredictionServiceMa
 * @param mOverLapGraphForWeatherPredictionServiceMin Instance of OverLapGraphForWeatherPredictionServiceMa
 * @param mOverLapGraphForWeatherPredictionServiceBck Instance of OverLapGraphForWeatherPredictionServiceMa
 */
  constructor(public mRepositoryyAPIService: RepositoryService,
    public mUIServiceService: UIServiceServiceService,
    public mUIToastService: UIToastService,
    public mTemperatureConverterService: TemperatureConverterService,
    public mOverLapGraphForWeatherPredictionServiceMax: OverLapGraphForWeatherPredictionService,
    public mOverLapGraphForWeatherPredictionServiceMin: OverLapGraphForWeatherPredictionService,
    public mOverLapGraphForWeatherPredictionServiceBck: OverLapGraphForWeatherPredictionService,
    public mBuisnessLogicService:BuisnessLogicService,
    public mGetLocationLatLonService:GetLocationLatLonService,
    public mGetCityNameGeocoderService:GetCityNameGeocoderService) {

    
    //this.loadFromUrl("Bengaluru");
    // this.getLatLon();

    this.mDateinDay = new Date().getDay();
   

  }

  
  async getLatLon(){
    const valueFromLocationService=await this.mGetLocationLatLonService.getGeolocation();
    if(valueFromLocationService!=='Error')
     this.getCityNameUsingLatLon(Number(valueFromLocationService.split("---")[0]),Number(valueFromLocationService.split("---")[1]));
  //  this.value=valueokok;
  }

  async getCityNameUsingLatLon(lat,lon){
    const cityAndCuntryCode=await this.mGetCityNameGeocoderService.getGeolocation(lat,lon);
    this.loadFromUrl(cityAndCuntryCode);
    this.value=cityAndCuntryCode;
  }

  value;




/**
 * Asynchronous call 
 * Load from 'openweathermap' URL
 * @param mCity CityName
 */
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
      this.resetVariable();
    }
    else {

      const mCurrentValue = await this.mRepositoryyAPIService.getWeatherValueCurrent(mCity);
      console.log(mCurrentValue);
      if (JSON.parse(mFiveDaysValue) == "Error") {
        this.mUIServiceService.dismissLoading();
        this.mUIToastService.presentToast();
        this.resetVariable();
      }
      else {

        this.mCity = JSON.parse(mCurrentValue).name+" , "+JSON.parse(mCurrentValue).sys.country;
        this.mCurrentTemp = Math.floor(this.mTemperatureConverterService.kelvinToCelcius((JSON.parse(mCurrentValue).main).temp)).toString() ;
        this.mWeather = (JSON.parse(mCurrentValue).weather)[0].description;
        this.mWind = (JSON.parse(mCurrentValue).wind).speed;
        this.mHumidity = (JSON.parse(mCurrentValue).main).humidity + "%";
        this.mCurrentWeatherIcon=this.mBuisnessLogicService.getWeatherBannerIconFromAssetFolder(JSON.parse(mCurrentValue).weather[0].description,JSON.parse(mCurrentValue).weather[0].icon);

        /// Insert Date into this.mDate Array
        this.mDate=this.mBuisnessLogicService.getNoOfDays(mFiveDaysValue);
        this.mDateForGraphRenderOnly=this.mBuisnessLogicService.formatDateForDateAndMonth(this.mDate);
         this.mDateNameForGraphRenderOnly=this.mBuisnessLogicService.getDayOfWeek(this.mDateinDay);
        
        // for (let i = 0; i < JSON.parse(mFiveDaysValue).list.length; i++) {
        //   console.log(JSON.parse(mFiveDaysValue).list[i]);
        //   var mDateAfterAplit = (JSON.parse(mFiveDaysValue).list[i].dt_txt).split(" ")[0];
        //   this.mDate.indexOf(mDateAfterAplit) === -1 ? this.mDate.push(mDateAfterAplit) : console.log();
        // }

        this.mDateForGraphRenderOnly=[]
        var monthNames = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];
        for (let i = 0; i < this.mDate.length; i++) {
          this.mDateForGraphRenderOnly.push(this.mDate[i].split("-")[2]+" "+monthNames[parseInt(this.mDate[i].split("-")[1])-1]);
          }

        ///// getHigh Log Temp Of Each Day /////
        // for (let i = 0; i < this.mDate.length; i++) {
        //   console.log(this.mDate[i]);

        //   var mHeigh = 0;
        //   var mLow = 0;
        //   var mWeatherIcon="";

        //   for (let j = 0; j < JSON.parse(mFiveDaysValue).list.length; j++) {
        //     var mDateAfterAplit = (JSON.parse(mFiveDaysValue).list[j].dt_txt).split(" ")[0];
        //     if (mDateAfterAplit == this.mDate[i]) {
        //       if (mHeigh == 0 && mLow == 0) {
        //         mHeigh = JSON.parse(mFiveDaysValue).list[j].main.temp_max;
        //         mWeatherIcon=this.mBuisnessLogicService.getWeatherForcastIconFromAssetFolder(JSON.parse(mFiveDaysValue).list[j].weather[0].icon);
        //         mLow = JSON.parse(mFiveDaysValue).list[j].main.temp_min;
        //         continue;
        //       }
        //       else {
        //         if (mHeigh < JSON.parse(mFiveDaysValue).list[j].main.temp_max) {
        //           mHeigh = JSON.parse(mFiveDaysValue).list[j].main.temp_max;
        //           mWeatherIcon=this.mBuisnessLogicService.getWeatherForcastIconFromAssetFolder(JSON.parse(mFiveDaysValue).list[j].weather[0].icon);
        //         }
        //         if (mLow > JSON.parse(mFiveDaysValue).list[j].main.temp_min) {
        //           mLow = JSON.parse(mFiveDaysValue).list[j].main.temp_min;
        //         }
        //       }

        //     }

        //   }

        //   this.mDateTempMax.push(Math.floor(this.mTemperatureConverterService.kelvinToCelcius(mHeigh)));
        //   this.mDateTempMin.push(Math.floor(this.mTemperatureConverterService.kelvinToCelcius(mLow)));
        //   this.mFiveDaysWeatherIcon.push(mWeatherIcon);

        //   console.log(this.mTemperatureConverterService.kelvinToCelcius(mHeigh)
        //     + "     " + this.mTemperatureConverterService.kelvinToCelcius(mLow));


        // }


        var getResultAfterFormating=this.mBuisnessLogicService.getFiveDaysValueInFormat(this.mDate,mFiveDaysValue);
        this.mDateTempMax=getResultAfterFormating[0];
        this.mDateTempMin=getResultAfterFormating[1];
        this.mFiveDaysWeatherIcon=getResultAfterFormating[2];

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

  /**
   * On Click From Search Icon
   */
  public onClickSearchBar(){
    console.log("ONCLick"+this.inputFromSearchBox);
    this.loadFromUrl(this.inputFromSearchBox.trim())
  }

/**
 *  Reset all variable
 */
public resetVariable(){
 
  this.mDate = [];
  this.mDateForGraphRenderOnly = [];
  this.mDateNameForGraphRenderOnly = [];
  this.mDateTempMax = [];
  this.mDateTempMin = [];
  this.maxTempof5DaysToGrphLimit=0;
  this.minTempof5DaysToraphLimit=0;
  this.mCity='';
  this.mCurrentTemp='';
  this.mWeather=''; 
  this.mWind='';
  this.mHumidity='';
  this.mCurrentWeatherIcon="";
  this.mFiveDaysWeatherIcon=[];
 this.inputFromSearchBox = "";

}

/**
 * Search with current location
 */
public onClickLoction(){
  this.getLatLon();
}

}