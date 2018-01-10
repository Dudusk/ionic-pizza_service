import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { NewPizzaPage } from '../pages/new-pizza/new-pizza';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { ModifPizzaPage } from '../pages/modif-pizza/modif-pizza';
import { ShowPizzaPage } from '../pages/show-pizza/show-pizza';
import { AdminPage } from '../pages/admin/admin';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { PizzaServices } from '../providers/pizza-services/pizza-services';

@NgModule({
  declarations: [
    MyApp,
    NewPizzaPage,
    ContactPage,
    HomePage,
    TabsPage,
    ModifPizzaPage,
    ShowPizzaPage,
    AdminPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    NewPizzaPage,
    ContactPage,
    HomePage,
    TabsPage,
    ModifPizzaPage,
    ShowPizzaPage,
    AdminPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HttpClient,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PizzaServices
  ]
})
export class AppModule {}
