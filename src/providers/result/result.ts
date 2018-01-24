
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

/*
  Generated class for the ResultsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ResultProvider {

  stepsResults=0;
  calResults = 0;
  bmi=0;
  height=0;
  weight=0;
  age=0;
  bd;
  goal=0;
  color;
  constructor(private storage: Storage) {

   /* storage.get('steps').then((val) => {
      this.stepsResults=val;
    });
    storage.get('calories').then((val) => {
      this.calResults=val;
    });*/
    storage.get('bmi').then((val) => {
      this.bmi=val;
    });
    storage.get('height').then((val) => {
      this.height=val;
    });
    storage.get('weight').then((val) => {
      this.weight=val;
    });
    storage.get('age').then((val) => {
      this.age=val;
    });
    storage.get('goal').then((val) => {
      this.goal=val;
    });
  }

  setSteps(a){
    this.stepsResults=a;
  }
  getSteps(){
    return this.stepsResults;
  }

  resetSteps(){
    this.stepsResults=0;
    this.calResults = 0;
   // this.storage.clear();
    this.storage.set('stepsSave',0);
    this.storage.set('caloriesSave',0);
    this.storage.set('goal',0)
  }


  setCal(a){
    this.calResults=a;
  }
  getCal(){
    return this.calResults;
  }


}
