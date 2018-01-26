import { Component } from '@angular/core';
import {IonicPage, MenuController, NavController, NavParams, Platform, Slide} from 'ionic-angular';

/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
export interface Slide {
  title: string;
  description: string;
  image: string;
}
@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {
  slides: Slide[];
  showSkip = true;
  dir: string = 'ltr';

  constructor(public navCtrl: NavController, public menu: MenuController,  public platform: Platform) {


    this.slides = [
      {
        title:"Welcome to the StepCounter",
        description :'The <b>Made with Ionic</b> is a fully-featured Ionic app with pedometer plugin for counting steps.',
        image: 'assets/logo.png',
      },
      {
        title:"How to use StepCounter ",
        description :'The <b>Ionic StepCounter </b> is a fully-featured app that counts.',
        image: 'assets/instructions.svg',
      },

    ]
  }

  startApp() {
    this.navCtrl.setRoot('HomePage', {}, {
      animate: true,
      direction: 'forward'
    });
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
