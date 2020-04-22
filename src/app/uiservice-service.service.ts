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
   * Show Loading Dialog
   * @param message UI Loading Message
   */
  public showLoading(message: string) {
      this.loaderLoading = true;
      this.loading.create({
          message,
          showBackdrop: true
      }).then(load => {
          this.loader = load;
          load.present().then(() => { this.loaderLoading = false; });
      });
  }

  /**
   * Dismiss Loading Dialog
   */
  public dismissLoading() {
      const interval = setInterval(() => {
          if (this.loader || !this.loaderLoading) {
              this.loader.dismiss().then(() => { /*this.loader = null; */clearInterval(interval)});
          } else if (!this.loader && !this.loaderLoading) {
              clearInterval(interval);
          }
      }, 500);
  }
}