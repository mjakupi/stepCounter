import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {Events} from "ionic-angular";

/*
  Generated class for the TimerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TimerProvider {

  timer: any = {};
  theTimer: any;
  timerstarted=false;
  started;
  startedCountingSteps;
  timerName='START';
  timerStart;
  public paragraph;

  constructor(public events: Events) {
    console.log('Hello TimerProvider Provider');

    this.resetTimerValues();

  }

  startTimer(){
    if(this.timerstarted==false){
      this.theTimer = setInterval(() => {
        this.timer.seconds++;

        this.events.publish('secondExpired', this.timer);

        if(this.timer.seconds == 60){
          this.timer.seconds = 0;
          this.timer.minutes++;
        }

        if(this.timer.minutes == 60){
          this.timer.minutes = 0;
          this.timer.hours++;
        }

      }, 1000);

      this.timerstarted=true;
    }

  }

  stopTimer(){
    if(this.timerstarted==true){
      this.timerstarted=false;
      this.getTimerValue()
     clearInterval(this.theTimer);

    }
  }

  resetTimerValues(){
    this.timer.hours = 0;
    this.timer.minutes = 0;
    this.timer.seconds = 0;
  }

  resetTimer(){

    this.stopTimer();
    this.resetTimerValues();

  }

  getTimerValue(){
    return this.timer;
  }

}
