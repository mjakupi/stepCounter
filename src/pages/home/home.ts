import { Component } from '@angular/core';
import {Pedometer, IPedometerData} from "@ionic-native/pedometer";
import {TimerProvider} from "../../providers/timer/timer";
import {AlertController, Events, IonicPage, ToastController} from "ionic-angular";
import {Subscription} from "rxjs/Subscription";
import {Storage} from "@ionic/storage";
import {Vibration} from "@ionic-native/vibration";
import {ResultProvider} from "../../providers/result/result";
import { SaveProvider } from '../../providers/save/save';
import { AndroidFullScreen } from '@ionic-native/android-full-screen';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  saved=false;
  setYourGoal=false;
  goal=0;
  goalCompleted;
  stepsWalked=0;
  calsBurned=0;
  started: Boolean= false;
  startCount: Boolean = false;
  stepsCount: any = 0;
  caloriesBurnt: any = 0;
  timer: any = {};
  pedoSubscribe: Subscription;
  getGoal;
  paragraphStartPressed=false;
  visible = false;
  constructor(private pedometer: Pedometer,
              private timerProvider:TimerProvider,
              private events:Events,
              private storage: Storage,
              private alertCtrl:AlertController,
              private toastCtrl:ToastController,
              private vibrator: Vibration,
              private rez:ResultProvider,
              private zacuvaj: SaveProvider,
              private fs: AndroidFullScreen
  ) {

    this.fs.isImmersiveModeSupported()
      .then(() => this.fs.immersiveMode())
      .catch((error: any) => console.log(error));
    this.timer = this.timerProvider.getTimerValue();

    this.events.subscribe('secondExpired', (data) => {
      this.timer = data;
    })

  }
  // presentResultModal() {
  //   let profileModal = this.modalCtrl.create('ResultsPage', { userId: 8675309 });
  //   profileModal.present();
  // }

  timerStarted=false;
  timerName='START';



  toggleCountSteps() {
    this.visible = !this.visible;
    this.paragraphStartPressed=true;
    this.timerProvider.paragraph=this.paragraphStartPressed;

    if(!this.timerStarted){

      this.timerName = 'STOP';
      this.timerStarted = true;
      this.timerProvider.started=this.timerStarted;

      if(this.startCount == false) {
        //ovdedodaov || uslov

        console.log("Counting steps");

        this.started=true;
        this.timerProvider.startTimer();


        this.pedoSubscribe=this.pedometer.startPedometerUpdates()
          .subscribe((data: IPedometerData) => {
            this.stepsCount = data.numberOfSteps;
            this.rez.stepsResults= this.stepsCount;
            //this.stepsWalked=this.stepsCount;
            this.caloriesBurnt =  Math.floor(this.stepsCount / 20); //  20 steps burn 1 Calorie.
            //this.calsBurned=this.caloriesBurnt;
            this.rez.calResults=this.caloriesBurnt;


            if(this.stepsCount==this.getGoal && this.getGoal>0){
              this.vibrator.vibrate([2000,1000,2000]);
              let alert = this.alertCtrl.create({
                title: "Goal Completed",
                buttons: [
                  {
                    text: 'OK',
                    role: 'cancel',
                    handler: data=>{
                      this.vibrator.vibrate(0);
                    }


                  }
                ]
              });
              alert.present();
            }
          });

        this.startCount = true;


      }
    }

    else{
      this.timerProvider.stopTimer();
      this.startCount = false;
      this.timerStarted=false;
      this.timerName='START';
      this.timerProvider.started=this.timerStarted;

    }
  }

  save(){
    this.saved=true;
    this.storage.set('stepsSave', this.stepsCount);
    this.storage.set('caloriesSave', this.caloriesBurnt);
    this.rez.setSteps(this.stepsCount);
    this.rez.setCal(this.caloriesBurnt) ;
    this.zacuvaj.steps=this.stepsCount;
    this.zacuvaj.calories=this.caloriesBurnt;
    let toast= this.toastCtrl.create({
      message:"You have walked " + this.stepsCount + " steps and burned " + this.caloriesBurnt + " calories",
      duration:5000
    });
    toast.present();
  }



  stopPedo(){

    this.timerProvider.stopTimer();
    this.startCount = false;

  }

  setGoal(){
    this.setYourGoal=true;
    let alert = this.alertCtrl.create({
      title:'Set Goal',
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

    this.timerProvider.resetTimer();
    this.caloriesBurnt=0;
    this.stepsCount=0;
    this.rez.stepsResults=0;//ovdeeeeeeeeeeeeeeeeeeeeeee neeeeeeeeeeeeee
    this.rez.calResults=0;
    this.startCount=false;
    //this.storage.clear();
    this.timerStarted=false;
    this.timerProvider.started=this.timerStarted;
    this.timerName="START";
    // this.rez.resetSteps();
    this.pedometer.stopPedometerUpdates();

  }


  ionViewDidLoad(){
    console.log('HOMWWWW');

    this.getGoal=this.rez.goal;
    this.caloriesBurnt=this.rez.calResults;
    this.stepsCount=this.rez.stepsResults;
    this.timerStarted=this.timerProvider.started;
    this.started=this.timerProvider.startedCountingSteps;
    this.paragraphStartPressed=this.timerProvider.paragraph;
    if(!this.timerStarted){
      this.timerName="START";
    }
    else{
      this.timerName="STOP";
      //OVDE DODADOV ZA PEDOMETAR DA PRODOLZIT 1!!!1!!!!!
      this.pedometer.startPedometerUpdates()
        .subscribe((data: IPedometerData) => {
          this.stepsCount = data.numberOfSteps;
          this.rez.stepsResults= this.stepsCount;
          //this.stepsWalked=this.stepsCount;
          this.caloriesBurnt =  Math.floor(this.stepsCount / 20); //  20 steps burn 1 Calorie.
          //this.calsBurned=this.caloriesBurnt;
          this.rez.calResults=this.caloriesBurnt;


          if(this.stepsCount==this.getGoal && this.getGoal>0){
            this.vibrator.vibrate([2000,1000,2000])
            let alert = this.alertCtrl.create({
              title: "Goal Completed",
              buttons: [
                {
                  text: 'OK',
                  role: 'cancel',
                  handler: data=>{
                    this.vibrator.vibrate(0);
                  }


                }
              ]
            });
            alert.present();
          }
        });

    }


  }
}
