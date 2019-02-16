import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule, Http } from '@angular/http';
import { AuthService , TransactionService} from './_services/index';
import { MapperDto } from './_mapper/index';

import { IonicApp, IonicErrorHandler, IonicModule, NavController, AlertController, LoadingController } from 'ionic-angular';
import { User, UserDetails, IDetailedError } from '@ionic/cloud-angular';


import { MyApp } from './app.component';
import { TaskListPage } from '../pages/tasklist/tasklist';
import { HomePage } from '../pages/home/home';
import { RegisterPage } from '../pages/register/register';
import { TermsPage } from '../pages/terms/terms';
import { PreferencesPage } from '../pages/preferences/preferences';
import { AboutPage } from '../pages/about/about';
import { SuggestionPage } from '../pages/suggestion/suggestion';
import { UserPage } from '../pages/user/user';
import { LoginPage } from './_login/index';
import { SearchUserPage } from '../pages/searchuser/searchuser';
import { TransactionCreatePage } from '../pages/transaction/transactionCreate';
import { TransactionInfoPage } from '../pages/transaction/transactionInfo';
import { TransactionAcceptPage } from '../pages/transaction/transactionAccept';
import { TransactionValoratePage } from '../pages/transaction/transactionValorate';
import { TransactionGetAllPage } from '../pages/transaction/transactionGetAll';
import { StatisticsPage } from '../pages/statistics/statistics';
import { WeekstatsPage } from '../pages/weekstats/weekstats';
import { ResetpasswordPage } from '../pages/resetpassword/resetpassword';
import { ChangepasswordPage }  from '../pages/changepassword/changepassword';


import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { IonicStorageModule } from '@ionic/storage';
import { Device } from '@ionic-native/device';
import { ImagePicker } from '@ionic-native/image-picker';
import { Base64 } from '@ionic-native/base64';


export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    MyApp,
    TaskListPage,
    HomePage,
    SearchUserPage,
    LoginPage,
    RegisterPage,
    TermsPage,
    PreferencesPage,
    AboutPage,
    SuggestionPage,
    UserPage,
    TransactionCreatePage,
    TransactionInfoPage,
    TransactionAcceptPage,
    TransactionValoratePage,
    TransactionGetAllPage,
    StatisticsPage,
    WeekstatsPage,
    ResetpasswordPage,
    ChangepasswordPage
  ],
  imports: [
    BrowserModule,
    //IonicModule.forRoot(MyApp),
    IonicModule.forRoot(MyApp, {}, {
      links: [
        {component: ChangepasswordPage, name:'changepassword', segment:'changepassword/:token'}
      ]
    }),
    HttpModule,
    IonicStorageModule.forRoot(),
    TranslateModule.forRoot({
    loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TaskListPage,
    HomePage,
    SearchUserPage,
    LoginPage,
    RegisterPage,
    TermsPage,
    PreferencesPage,
    AboutPage,
    SuggestionPage,
    UserPage,
    TransactionCreatePage,
    TransactionInfoPage,
    TransactionAcceptPage,
    TransactionValoratePage,
    TransactionGetAllPage,
    StatisticsPage,
    WeekstatsPage,
    ResetpasswordPage,
    ChangepasswordPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    TransactionService,
    Device,
    MapperDto,
    ImagePicker,
    Base64
  ]
})
export class AppModule {}
