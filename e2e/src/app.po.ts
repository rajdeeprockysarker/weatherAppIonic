import { browser, by, element } from 'protractor';
/**
 * System Defined
 * @ignore
 */
export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.deepCss('app-root ion-content')).getText();
  }
}
