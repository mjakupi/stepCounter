
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

/*
  Generated class for the SaveProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SaveProvider {
  public steps=0;
  public calories=0;
  public bd;
  public color;
  public calculated;


  constructor(private storage: Storage) {
    console.log('Hello SaveProvider Provider');

    storage.get('stepsSave').then((val) => {
      this.steps=val;
    });
    storage.get('caloriesSave').then((val) => {
      this.calories=val;
    });
    storage.get('bmiDescription').then((val) => {
      this.bd=val;
    });
    storage.get('descriptionColor').then((val) => {
      this.color=val;
    });
    storage.get('bmiCalculated').then((val) => {
      this.calculated=val;
    });
  }
resetSteps(){
  this.steps=0;
  this.calories=0;
  this.calculated=false;
  this.bd='';
  this.color='';
  //this.storage.set('stepsSave',0)
 // this.storage.set('caloriesSave',0)
  this.storage.set('bmiDescription','');
  this.storage.set('descriptionColor','');
  this.storage.set('bmiCalculated',false)
 // this.storage.clear();
}
}
