import { Component } from '@angular/core';
import {IonicPage, MenuController, NavController, NavParams, Platform, Slide} from 'ionic-angular';
@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {
  showSkip = true;
  constructor(public navCtrl: NavController, public menu: MenuController,  public platform: Platform) {}

  startApp() {
    var userLoggedIn = window.localStorage.getItem('userLoggedIn');

    if(userLoggedIn == '1'){
      this.navCtrl.setRoot('HomePage');
    }else{
      window.localStorage.setItem('slidesShown','1');
      this.navCtrl.setRoot('HomePage');
    }
  }

  onSlideChangeStart(slider) {
    this.showSkip = !slider.isEnd;
  }

  ionViewDidEnter() {
    // the root left menu should be disabled on the tutorial page
    this.menu.enable(false);
  }

  ionViewWillLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }
}
