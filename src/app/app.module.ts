import {AutoCompleteModule} from 'ionic2-auto-complete';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { SearchPage } from '../pages/search/search';
import { SettingsPage } from '../pages/settings/settings';
import { TabsPage } from '../pages/tabs/tabs';
import { ShowCardPage } from '../pages/show-card/show-card'
import { SearchSetPage } from '../pages/search-set/search-set';
import { ViewSetPage } from '../pages/view-set/view-set';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RestService } from '../services/restService';
import { HttpModule }  from '@angular/http';
import { SearchAutocompleteService } from '../services/searchAutocompleteService';
import { KrIconComponent } from "../components/kr-icons/kr-icon.component";
import { SettingsService } from '../services/settings.service';
import { NativeStorage } from '@ionic-native/native-storage';
import { TradeListService } from '../services/tradeList.service';
import { TradeListPage } from '../pages/trade-list/trade-list';
import { NumberFormatter } from '../services/numberFormatter.service';
import { FlashCardComponent } from '../components/flash-card/flash-card';
import { ButtonListComponent } from '../components/button-list/button-list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExpandableComponent } from '../components/expandable/expandable';
import { ListViewSettings } from '../services/listViewSettings.service';
import { CacheModule } from "ionic-cache";







@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    SearchPage,
    SettingsPage,
    ShowCardPage,
    SearchSetPage,
    ViewSetPage,
    TabsPage,
    TradeListPage,
    KrIconComponent,
    FlashCardComponent,
    ButtonListComponent,
    ExpandableComponent
    
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    CacheModule.forRoot(),
    HttpModule,
    AutoCompleteModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    SearchPage,
    SettingsPage,
    ShowCardPage,
    ViewSetPage,
    TabsPage,
    TradeListPage,
    SearchSetPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestService,
    SearchAutocompleteService,
    SettingsService,
    NativeStorage,
    TradeListService,
    NumberFormatter,
    ButtonListComponent,
    ExpandableComponent,
    ListViewSettings
  ]
})
export class AppModule {}
