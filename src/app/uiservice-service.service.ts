import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
/**
 * Inject to root of app
*/
@Injectable({
  providedIn: 'root'
})

/**
 * Service for UILoading
*/
export class UIServiceServiceService {

/**
 * Constructor description
 * @param {LoadingController} loading From ionic/angular
 */
  constructor(private loading: LoadingController) { }

/**
 * Loader nstace create
 */
  private loader: HTMLIonLoadingElement;

/**
 * Continue show loading dialog
 */
  private loaderLoading = false;

 /**
  * Loading constant 
  * */ 

  mLoading;

  /**
   * Show Loading Dialog
   * @param message UI Loading Message
   */
  async showLoading(message: string) {
    //   this.loaderLoading = true;
    //   this.loading.create({
    //       message,
    //       showBackdrop: true
    //   }).then(load => {
    //       this.loader = load;
    //       load.present().then(() => { this.loaderLoading = false; });
    //   });
    this.mLoading = await this.loading.create({
        message: 'Please wait...',
        duration: 1000
      });
      await this.mLoading.present();
  }

  /**
   * Dismiss Loading Dialog
   */
  async dismissLoading() {
    //   const interval = setInterval(() => {
    //       if (this.loader || !this.loaderLoading) {
    //           this.loader.dismiss().then(() => { /*this.loader = null; */clearInterval(interval)});
    //       } else if (!this.loader && !this.loaderLoading) {
    //           clearInterval(interval);
    //       }
    //   }, 500);
    const { role, data } = await this.mLoading.onDidDismiss();
  }

}