import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
/**
 * Supplies configuration metadata for an App component.
*/
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
/**
 * Components of platform, splashScreen, statusBar
*/
export class AppComponent {
/**
 * Constructor of AppComponent.ts
 * @constructor for App Component
 * @param {Platform} platform
 * @param {SplashScreen} splashScreen
 * @param {StatusBar} statusBar
*/
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }
/**
 * Initialize Application at beginning
*/
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
