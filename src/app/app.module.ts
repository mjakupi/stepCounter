import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ResultProvider } from '../providers/result/result';
import { TimerProvider } from '../providers/timer/timer';

import { Pedometer } from '@ionic-native/pedometer';
import { Vibration } from '@ionic-native/vibration';
import { IonicStorageModule } from '@ionic/storage';
import { SaveProvider } from '../providers/save/save';
import { AndroidFullScreen } from '@ionic-native/android-full-screen';

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ResultProvider,
    TimerProvider,
    Pedometer,
    Vibration,
    SaveProvider,
    AndroidFullScreen

  ]
})
export class AppModule {}
