import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { ResultProvider } from '../../providers/result/result';
import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { SaveProvider } from '../../providers/save/save';
import { AndroidFullScreen } from '@ionic-native/android-full-screen';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              private alertCtrl:AlertController,
              private rez:ResultProvider,
              private storage:Storage,
              private toastCtrl:ToastController,
              private zacuvaj:SaveProvider,
              private fs: AndroidFullScreen) {
                this.fs.isImmersiveModeSupported()
                .then(() => this.fs.immersiveMode())
                .catch((error: any) => console.log(error));
  }
  height:number=0;
  weight:number=0;
  age:number=0;
  bmi:number=0;
  calculated=false;
  color;
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');

    this.height=this.rez.height;
    this.weight=this.rez.weight;
    this.age=this.rez.age;
    this.bmi=this.rez.bmi;
    if(!this.calculated){
      this.bmiDescription=this.zacuvaj.bd;
      this.color=this.zacuvaj.color;
    }

   
    

  }
  
  setHeight(){
  
    let alert = this.alertCtrl.create({
      title:'Set Height',
      inputs: [
        {
          placeholder: 'Height in cm'
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
            this.height = data[0];
            //this.storage.set('setGoal',this.goal);
            this.rez.height =this.height;
          this.storage.set('height', this.height);// SET HEIGHT ---------------------------------------

            if(this.height==0){
              let toast= this.toastCtrl.create({
                message:"Set your height",
                duration:5000
              });
              toast.present();
            }
            else if(data[0]==null || data[0]==0){
              this.height=0;
              let toast= this.toastCtrl.create({
                message:"Set your height",
                duration:5000
              });
              toast.present();
            }
            else if(this.weight>0){
              this.calculateBMI();
              this.calculated=false;
              this.zacuvaj.calculated=this.calculated;
            }
            

          }
        }
      ]

    });

    alert.present();


  }

  setWeight(){
  
    let alert = this.alertCtrl.create({
      title:'Set Weight',
      inputs: [
        {
          placeholder: 'Weight in kg'
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
            this.weight = data[0];
            //this.storage.set('setGoal',this.goal);
            this.storage.set('weight',this.weight); //SET WEIGHT ------------------------------------
            this.rez.weight =this.weight;

            this.storage.set('weight', this.weight);
            if(this.height!=0 && this.weight!=0){
              this.calculateBMI();
               this.calculated=false;
               this.zacuvaj.calculated=this.calculated;
            }
            else if(this.height==0){
              let toast= this.toastCtrl.create({
                message:"Set your height",
                duration:5000
              });
              toast.present();
            }

            else if(this.weight==0){
              let toast= this.toastCtrl.create({
                message:"Set your weight",
                duration:5000
              });
              toast.present();
            }
            else if(data[0]==null || data[0]==0){
              this.weight=0;
              let toast= this.toastCtrl.create({
                message:"Set your weight",
                duration:5000
              });
              toast.present();
            }
            
           

          }
        }
      ]

    });

    alert.present();


  }


  setAge(){
  
    let alert = this.alertCtrl.create({
      title:'Set Age',
      inputs: [
        {
          placeholder: '24'
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
            this.age = data[0];
            //this.storage.set('setGoal',this.goal);
            this.rez.age =this.age;
            this.storage.set('age', this.age);//SET UR AGE -------------------------------------------------
            if(data[0]==null || data[0]==0){
              this.age=0;
              let toast= this.toastCtrl.create({
                message:"Set your age",
                duration:5000
              });
              toast.present();
            }

          }
        }
      ]

    });

    alert.present();


  }
bmiDescription;
  calculateBMI(){
    let h=(this.height*0.01)*(this.height*0.01);
    let w=this.weight;
    this.bmi=w/h;
    this.rez.bmi=this.bmi;
    this.storage.set('bmi',this.bmi); //SET BMI ------------------------------------------
    this.calculated=true;
    this.zacuvaj.calculated=this.calculated;
    this.storage.set('bmiCalculated',this.calculated)//BMI CALCULATED---------------------------------------

    if(this.bmi<18.5 && this.bmi!=null){
      this.bmiDescription="Underweight";
      this.zacuvaj.bd= this.bmiDescription;
      this.zacuvaj.color=this.color;
      this.color="blue";
      this.storage.set('bmiDescription',this.bmiDescription);
      this.storage.set('descriptionColor',this.color);
    }
    else if(this.bmi>=18.5 && this.bmi<=24.9 && this.bmi!=null){
      this.bmiDescription="Healthy";
      this.zacuvaj.bd= this.bmiDescription;
      this.color="green";
          this.zacuvaj.color=this.color;
      this.storage.set('bmiDescription',this.bmiDescription);
      this.storage.set('descriptionColor',this.color);
  
    }
    else if(this.bmi>24.9 && this.bmi!=null){
      this.bmiDescription="Overweight";
      this.zacuvaj.bd= this.bmiDescription
      this.color="red";
        this.zacuvaj.color=this.color;
      this.storage.set('bmiDescription',this.bmiDescription);
      this.storage.set('descriptionColor',this.color);
    
    }
    
    
  }

  reset(){
    //this.zacuvaj.resetSteps()
    this.age=0;
    this.rez.age=this.age;
    this.height=0;
    this.rez.height=this.height;
    this.weight=0;
    this.rez.weight=this.weight
    this.bmi=0;
    this.rez.bmi=this.bmi
    this.bmiDescription='';
    this.zacuvaj.bd=this.bmiDescription;
  // this.storage.clear();
   this.storage.set('bmiDescription','');
      this.storage.set('descriptionColor','');
      this.storage.set('height',0);
      this.storage.set('weight',0);
      this.storage.set('age',0);
      this.storage.set('bmi',0);
  }
}
