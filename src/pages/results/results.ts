import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {Storage} from "@ionic/storage";
import {ResultProvider} from "../../providers/result/result";
import { SaveProvider } from '../../providers/save/save';
import { AndroidFullScreen } from '@ionic-native/android-full-screen';

/**
 * Generated class for the ResultsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-results',
  templateUrl: 'results.html',
})
export class ResultsPage {

  myDate: String = new Date().toISOString();
  goal=0
  steps=0;
  calories=0;
  setYourGoal=false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage:Storage,
              private alertCtrl:AlertController, private toastCtrl:ToastController, 
              private rez: ResultProvider, private zacuvaj: SaveProvider, private fs: AndroidFullScreen) {

                this.fs.isImmersiveModeSupported()
                .then(() => this.fs.immersiveMode())
                .catch((error: any) => console.log(error));


  }

  ionViewDidLoad() {
    console.log('PROFILEEEE');

    this.steps= this.zacuvaj.steps;
    this.storage.set('stepsSave',this.steps);
    this.calories=this.zacuvaj.calories;
    this.storage.set('caloriesSave',this.calories);
    this.goal=this.rez.goal;

  }

  setGoal(){
    this.setYourGoal=true;
    let alert = this.alertCtrl.create({
      inputs: [
        {
          placeholder: 'Set Goal'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },

        {
          text: 'Save',

          handler: data => {
            //statusalert.setTitle('Updated');
            if(data[0]!=0 || data[0]!=null || this.goal!=0){
              this.goal = data[0];
              this.rez.goal=this.goal;
              this.storage.set('goal',this.goal);
            }
            else{
              let toat= this.toastCtrl.create({
                message:"Set a goal larger than 0",
                duration:5000
              });
              toat.present();
            }

          }
        }
      ]

    });

    alert.present();


  }

  reset(){
    this.goal=0;
    this.rez.goal=this.goal;
    this.calories=0;
    this.zacuvaj.calories=this.calories
    this.steps=0;
    this.zacuvaj.steps=this.steps;
    this.storage.set('goal',0);
    this.storage.set('stepsSave',0);
    this.storage.set('caloriesSave',0);
  

  }
}
