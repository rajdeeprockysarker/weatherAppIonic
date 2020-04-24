import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { HttpClient,HttpHandler } from '@angular/common/http';
import { HomePage } from './home.page';
import { RepositoryService } from '../repository.service';
import { TemperatureConverterService } from '../temperature-converter.service';
import { GetCityNameGeocoderService } from '../get-city-name-geocoder.service';
import { GetLocationLatLonService } from '../get-location-lat-lon.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { FormsModule } from '@angular/forms';
import { Platform } from '@ionic/angular';
import { UIServiceServiceService } from '../uiservice-service.service';
import { UIToastService } from '../uitoast.service';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePage ],
      imports: [IonicModule.forRoot(),FormsModule],
      providers: [
        HttpClient,HttpHandler,RepositoryService,
        TemperatureConverterService,
        GetCityNameGeocoderService,
        GetLocationLatLonService,
        Geolocation,
        NativeGeocoder,
        Platform
    ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create variable to use', () => {
    expect(component.mDate).toBeUndefined;
    expect(component.mDateTempMax).toBeUndefined;
    expect(component.mDateTempMin).toBeUndefined;
    expect(component.mFiveDaysWeatherIcon).toBeUndefined;
    expect(component.mGraphMaxMinFromTempDelta).toBeUndefined;
    expect(component.mHumidity).toBeUndefined;
    expect(component.mOverLapGraphForWeatherPredictionServiceBck).toBeUndefined;
    expect(component.mOverLapGraphForWeatherPredictionServiceMax).toBeUndefined;
    expect(component.mOverLapGraphForWeatherPredictionServiceMin).toBeUndefined;
    expect(component.mRepositoryyAPIService).toBeUndefined;
    expect(component.mTemperatureConverterService).toBeUndefined;
    expect(component.mUIServiceService).toBeUndefined;
    expect(component.mUIToastService).toBeUndefined;
    expect(component.mWeather).toBeUndefined;
    expect(component.mWind).toBeUndefined;
    expect(component.maxTempof5DaysToGrphLimit).toBeUndefined;
    expect(component.minTempof5DaysToraphLimit).toBeUndefined; 
});

it('Should call function to fetch data from URL', () => {

  let mrepo=fixture.debugElement.injector.get(RepositoryService); 
  expect(mrepo.getWeatherValueCurrent("Kolkata")).toBeTruthy();
  expect(mrepo.getWeatherValueFiveDays("Kolkata")).toBeTruthy();
});

it('Should call function to fetch data from URL', () => {

  let mrepo=fixture.debugElement.injector.get(RepositoryService); 
  expect(mrepo.getWeatherValueCurrent("Kolkata")).toBeTruthy();
  expect(mrepo.getWeatherValueFiveDays("Kolkata")).toBeTruthy();
});

it('Should call TemperatureConverterService', () => {

  let mTemp=fixture.debugElement.injector.get(TemperatureConverterService); 
  expect(mTemp.kelvinToCelcius(300)).toEqual(26.850000000000023);
 
});

it('Should be reset all variables', () => {
  expect(component.resetVariable()).toBeUndefined();
});

it('Should able call with argument from HomePage', () => {  
  let mrepo=fixture.debugElement.injector.get(UIToastService); 
  expect(mrepo.presentToastWithArgumentMessage("Pass Argument")).toBeTruthy();
});

});
