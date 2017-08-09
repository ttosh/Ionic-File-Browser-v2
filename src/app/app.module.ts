import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { HttpModule } from '@angular/http';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { FileBrowserApp } from './app.component';
import { FileBrowserPage } from '../pages/fileBrowser/file-browser';

@NgModule({
  declarations: [
    FileBrowserApp,
    FileBrowserPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(FileBrowserApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    FileBrowserApp,
    FileBrowserPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
