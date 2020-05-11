import { Component,ViewChild } from '@angular/core';
import { MenuController } from '@ionic/angular';
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
import { StringValueEnum} from '../string-value-enum.enum';

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
 * Enum value
 */
  mStringValueEnum;

/**
 * Visible on Data / Invisible on No-Data
 */
mBackgroundLayoutVisiblity=false;
/**
 * Searchbar input character minimum limit
 */
mSearchBarInputLimit=2


/**
 * Constructor for Homepage.ts
 * @param mRepositoryyAPIService Instance of RepositoryyAPIService
 * @param mUIServiceService Instance of UIServiceService
 * @param mUIToastService Instance of UIToastService
 * @param mTemperatureConverterService Instance of TemperatureConverterService
 * @param mOverLapGraphForWeatherPredictionServiceMax Instance of OverLapGraphForWeatherPredictionServiceMa
 * @param mOverLapGraphForWeatherPredictionServiceMin Instance of OverLapGraphForWeatherPredictionServiceMa
 * @param mOverLapGraphForWeatherPredictionServiceBck Instance of OverLapGraphForWeatherPredictionServiceMa
 * @param mBuisnessLogicService Instance of BuisnessLogicService
 * @param mGetLocationLatLonService Instance of GetLocationLatLonService
 * @param mGetCityNameGeocoderService Instance of GetCityNameGeocoderService
 * @param menuCtrl Instance of MenuController
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
    public mGetCityNameGeocoderService:GetCityNameGeocoderService,
    public menuCtrl: MenuController) {

      this.mStringValueEnum=StringValueEnum;
    
    //this.loadFromUrl("Bengaluru");
    // this.getLatLon();
 

    this.mDateinDay = new Date().getDay();
    this.onClickLoction();

  }

/**
 * Method is called Angular when the page  is rendered
 */
  ngOnInit() {
    this.menuCtrl.swipeGesture(false);
  }
  /**
   * Get Lat Long From GetLocationLatLonService
   */
  async getLatLon(){
    const valueFromLocationService=await this.mGetLocationLatLonService.getGeolocation();
    console.log(valueFromLocationService);
    if(JSON.parse(JSON.stringify(valueFromLocationService)).Exception!==this.mStringValueEnum.Error)
     this.getCityNameUsingLatLon(Number(JSON.parse(JSON.stringify(valueFromLocationService)).Latitude),Number(JSON.parse(JSON.stringify(valueFromLocationService)).Longitude));
  //  this.value=valueokok;
  }
  /**
   * Get CityName From GetCityNameGeocoderService
   * @param lat Latitude
   * @param lon Longitude 
   */
  async getCityNameUsingLatLon(lat,lon){
    const cityAndCuntryCode=await this.mGetCityNameGeocoderService.getGeolocation(lat,lon);
    if(cityAndCuntryCode.toString().length>0 && cityAndCuntryCode.toString()!=this.mStringValueEnum.Error){
    this.loadFromUrl(cityAndCuntryCode);
    }
    else{
      this.mUIToastService.presentToastWithArgumentMessage(this.mStringValueEnum.EnableYourGPS);
    }
  }




/**
 * Asynchronous call 
 * Load from 'openweathermap' URL
 * @param mCity CityName
 */
  async loadFromUrl(mCity: string) {

    this.mDate = [];
    this.mDateTempMax = [];
    this.mDateTempMin = [];

    this.mUIServiceService.showLoading(this.mStringValueEnum.Loading);
    const mFiveDaysValue = await this.mRepositoryyAPIService.getWeatherValueFiveDays(mCity);
    //console.log(mFiveDaysValue);
    if (JSON.parse(mFiveDaysValue) == this.mStringValueEnum.UnknownError || 
    JSON.parse(mFiveDaysValue) == this.mStringValueEnum.NotFound ) {
      this.mUIServiceService.dismissLoading();
      (JSON.parse(mFiveDaysValue) == this.mStringValueEnum.UnknownError)?this.mUIToastService.presentToastWithArgumentMessage(this.mStringValueEnum.PleaseCheckNetworkConnection)
                                                    :this.mUIToastService.presentToastWithArgumentMessage(this.mStringValueEnum.LocationNotFound);      
      this.resetVariable();
      this.mBackgroundLayoutVisiblity=false;
      document.documentElement.style.setProperty(`--mBackgroundLayoutVisiblity`, "none");
    }
    else {

      const mCurrentValue = await this.mRepositoryyAPIService.getWeatherValueCurrent(mCity);
      console.log(mCurrentValue);
      if (JSON.parse(mFiveDaysValue) == this.mStringValueEnum.UnknownError || 
      JSON.parse(mFiveDaysValue) == this.mStringValueEnum.NotFound  ) {
        this.mUIServiceService.dismissLoading();
        (JSON.parse(mFiveDaysValue) == this.mStringValueEnum.UnknownError)?this.mUIToastService.presentToastWithArgumentMessage(this.mStringValueEnum.PleaseCheckNetworkConnection)
        :this.mUIToastService.presentToastWithArgumentMessage(this.mStringValueEnum.LocationNotFound);      

        this.resetVariable();
        this.mBackgroundLayoutVisiblity=false;
        document.documentElement.style.setProperty(`--mBackgroundLayoutVisiblity`, "none");
      }
      else {
        this.mBackgroundLayoutVisiblity=true;
        document.documentElement.style.setProperty(`--mBackgroundLayoutVisiblity`, "");
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
        


        this.mDateForGraphRenderOnly=[]
        var monthNames = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];
        for (let i = 0; i < this.mDate.length; i++) {
          this.mDateForGraphRenderOnly.push(this.mDate[i].split("-")[2]+" "+monthNames[parseInt(this.mDate[i].split("-")[1])-1]);
          }
 
        var getResultAfterFormating=this.mBuisnessLogicService.getFiveDaysValueInFormat(this.mDate,mFiveDaysValue);
        this.mDateTempMax=getResultAfterFormating[0];
        this.mDateTempMin=getResultAfterFormating[1];
        this.mFiveDaysWeatherIcon=getResultAfterFormating[2];

        console.log("Graph Calling");
          this.maxTempof5DaysToGrphLimit=Math.max(...this.mDateTempMax)+this.mGraphMaxMinFromTempDelta;
         this.minTempof5DaysToraphLimit=Math.min(...this.mDateTempMin)-this.mGraphMaxMinFromTempDelta;


        this.mOverLapGraphForWeatherPredictionServiceMax.showGrapg(this.lineChartMax, this.lineCanvasMax, this.mDate,
          this.mDateTempMax, this.mStringValueEnum.Highest, 'rgba(225,217,104)',this.minTempof5DaysToraphLimit
          ,this.maxTempof5DaysToGrphLimit);

        this.mOverLapGraphForWeatherPredictionServiceMin.showGrapg(this.lineChartMin, this.lineCanvasMin, this.mDate
          , this.mDateTempMin, this.mStringValueEnum.Lowest, 'rgba(15,148,225)',this.minTempof5DaysToraphLimit
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
   * On click from search icon
   */
  public onClickSearchBar(){
    if(this.mBuisnessLogicService.characterCountValidation(this.inputFromSearchBox, this.mSearchBarInputLimit)){
    console.log("ONCLick"+this.inputFromSearchBox)
    this.loadFromUrl(this.inputFromSearchBox.trim())
    }
    else{
      this.mUIToastService.presentToastWithArgumentMessage(this.mStringValueEnum.PleaseEnterMoreThanTwoCharacters);
    }
    
  }

/**
 *  Reset all variable
 */
public resetVariable(){
  this.mBackgroundLayoutVisiblity=false;
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
  document.documentElement.style.setProperty(`--mBackgroundLayoutVisiblity`, "none");
  this.getLatLon();
}



}