import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RepositoryService } from '../app/repository.service';
import { HttpClientModule } from '@angular/common/http';
import { BuisnessLogicService } from '../app/buisness-logic.service';
import { UIServiceServiceService } from '../app/uiservice-service.service';
import { UIToastService } from '../app/uitoast.service';
import { TemperatureConverterService } from '../app/temperature-converter.service';
import { OverLapGraphForWeatherPredictionService } from '../app/over-lap-graph-for-weather-prediction.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { GetLocationLatLonService } from './get-location-lat-lon.service';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    NativeGeocoder,    
    RepositoryService,
    UIServiceServiceService,
    UIToastService,
    BuisnessLogicService,
    TemperatureConverterService,
    GetLocationLatLonService,
    OverLapGraphForWeatherPredictionService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
