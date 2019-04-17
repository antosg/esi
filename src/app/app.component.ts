import { Component,ViewChild  } from '@angular/core';
import { NavController, Platform, Nav, MenuController, AlertController, Events, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RepServices } from './providers/rep-services';

import { TaskListPage } from '../pages/tasklist/tasklist';
import { HomePage } from '../pages/home/home';
import { LoginPage} from './_login/index';
import { SearchUserPage } from '../pages/searchuser/searchuser';
import { RegisterPage } from '../pages/register/register';
import { PreferencesPage } from '../pages/preferences/preferences';
import { UserPage } from '../pages/user/user';
import { AboutPage } from '../pages/about/about';
import { SuggestionPage } from '../pages/suggestion/suggestion';
import { StatisticsPage } from '../pages/statistics/statistics';
import { WeekstatsPage } from '../pages/weekstats/weekstats';
import { AuthService } from './_services/index';
import { userPreferencesRq, userPreferencesRsp } from './_dtos/index';

import { TranslateService } from '@ngx-translate/core';
import {LoginRs} from './_dtos/index';
import { DomSanitizer } from '@angular/platform-browser';

export interface PageInterface {
  title: string;
  name: string;
  component: any;
  icon: string;
  logsOut?: boolean;
  index?: number;
  tabName?: string;
  tabComponent?: any;
}

declare const FCMPlugin: any;

@Component({
  templateUrl: 'app.html',
  providers: [RepServices]
})
export class MyApp {

  rootPage:any = LoginPage;
  userObj:LoginRs;
  @ViewChild(Nav) nav: Nav;
  imgPreview = 'assets/img/blank-avatar.png';
  loginRs: LoginRs;
  nameMenu: string;
  userPreferencesRsp: userPreferencesRsp = new userPreferencesRsp();
    newImg : any;

  appPages: PageInterface[] = [
  ];
  loggedInPages: PageInterface[] = [
    { title: 'HOME', name: 'HomePage', component: HomePage, index: 1,icon: 'home' },
    { title: 'STATISTICS', name: 'StatisticsPage', component: StatisticsPage, index: 2,icon: 'stats' },
    { title: 'SUGGESTIONS_SLIDE', name: 'SuggestionPage', component: SuggestionPage, index: 3,icon: 'send' },
    { title: 'USER_SLIDE', name: 'UserPage', component: UserPage, index: 4,icon: 'person' },
    { title: 'PREFERENCES_SLIDE', name: 'PreferencesPage', component: PreferencesPage, tabComponent: PreferencesPage, index: 5, icon: 'options' },
    { title: 'ABOUT_SLIDE', name: 'AboutPage', component: AboutPage, tabComponent: AboutPage, index: 6, icon: 'information' },
    { title: 'LOG_OUT_SLIDE', name: 'LogoutPage', component: null, index: 7, icon: 'log-out', logsOut: true }
  ];
  loggedOutPages: PageInterface[] = [
    { title: 'LOGIN_SLIDE', name: 'LoginPage', component: LoginPage, index: 1, icon: 'log-in' },
    { title: 'REGISTRO_SLIDE', name: 'RegisterPage', component: RegisterPage, index: 2, icon: 'person-add' },
    { title: 'ABOUT_SLIDE', name: 'AboutPage', component: AboutPage, tabComponent: AboutPage, index: 10, icon: 'information' }
  ];

  constructor(    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public repServices: RepServices,
    public translate: TranslateService,
    public alertCtrl: AlertController,
    public authService: AuthService,
    public events: Events,
    public app: App,
    private sanitizer: DomSanitizer,
    public menu: MenuController) {

    //Definimos el idioma por defecto
    let val = localStorage.getItem('languageApp');
      console.log('languageApp al arrancar la app vale -> ' + val);
      if (val === null){ val = "es"; }
      translate.setDefaultLang(val);

    if (localStorage.getItem('token') === "null" || localStorage.getItem('token') === ""
     || localStorage.getItem('token') === undefined){
        this.enableMenu(false);
      }else{
        console.log("token no es nulo ni blanco..." + localStorage.getItem('user'));
        this.enableMenu(true);
      }

    //Buscamos el token, si hay token suponemos que está logeado y redirimios a HomePage en
    //lugar de a LoginPage
      console.log('tokenApp al arrancar la app vale -> ' + localStorage.getItem('token'));
      if (localStorage.getItem('token') === "null" || localStorage.getItem('token') === ""
     || localStorage.getItem('token') === null){
        console.log('cargo login page...');
        this.enableMenu(false);
        this.rootPage = LoginPage;
      }else{
        console.log('cargo homepage...');
        this.enableMenu(true);
        this.rootPage= HomePage;
      }

    //simplemente para ver swi hay "algo" o no
    console.log("user al arrancar vale -> " + localStorage.getItem('user'));

    events.subscribe('user:logged', () => {
      // user and time are the same arguments passed in `events.publish(user, time)`
      console.log('Alguien se ha logeado' + localStorage.getItem('user'));
      this.loginRs = JSON.parse(localStorage.getItem('user'));
      this.nameMenu = this.loginRs.user.name + ' ' + this.loginRs.user.surname;
      this.authService.recoverUserPreferences().then((preferencesResult) => {
        console.log('ok recoverPreferencesData');
        let preferencesData: any = preferencesResult;
        this.userPreferencesRsp = preferencesData;
        if (this.userPreferencesRsp.preferences.avatar != null && this.userPreferencesRsp.preferences.avatar != ""){
          this.newImg = this.userPreferencesRsp.preferences.avatar;
        }
      });
    });

    platform.ready().then(() => {

      console.log("dentro de platform.ready()....");

      platform.registerBackButtonAction(() => {
          console.log("registerBackButtonAction1");
          //let nav = app.getActiveNavs()[0];
          console.log("registerBackButtonAction2");
          let activeView = this.nav.getActive();
          let activeNav = this.app.getActiveNav();
          console.log("registerBackButtonAction3");

          if(activeView.name === "HomePage") {
              console.log("estoy en la homepage");
              if (this.nav.canGoBack()){ //Can we go back?
                this.nav.pop();
              } else {
                  const alert = this.alertCtrl.create({
                      title: '^Salir',
                      message: '^Desea salir de la app?',
                      buttons: [{
                          text: '^Cancelar',
                          role: '^Cancelar',
                          handler: () => {
                              console.log('Application exit prevented!');
                          }
                      },{
                          text: '^Cerrar App',
                          handler: () => {
                              this.platform.exitApp(); // Close this application
                          }
                      }]
                  });
                  alert.present();
              }
          }else{
            console.log("fuera de la homepage...");
            if (this.nav.canGoBack()){ //Can we go back?
              this.nav.pop();
            }
            console.log("fuera de goback");
          }

      }, 100);

      if (localStorage.getItem('token') === "null" || localStorage.getItem('token') === ""
     || localStorage.getItem('token') === null){
        console.log('cargo login page...');
        this.enableMenu(false);
      }else{
        console.log('cargo homepage...');
        this.enableMenu(true);
      }

      statusBar.styleDefault();
      console.log("dentro de platform.ready()1....");
      splashScreen.hide();
      console.log("dentro de platform.ready()2....");

      let val2 = localStorage.getItem('topic');
        console.log('topic -> ', val2);
        if (val2 === "notificar"){
          console.log("fmcplugin -> notificar");
          //FCMPlugin.subscribeToTopic('notificar');
        }

/*
        FCMPlugin.onTokenRefresh(function(token){
          alert("token generado...." + token );
        });
*/
    });

  }

  openPage(page) {
    if (!page.component){
      console.log("no me llega página... por lo que debería ser un logout...");
      //Si lo hemos hecho bien, esto es el logout.....
      //1. debemos borrar el token y la información del usuario
      //2. debemos llamar a la función de logout de la API
      //3. Redirigimos a login
      this.doAuthLogout();
      //this.events.publish('logout');
    }else{
      // Reset the content nav to have just this page
      // we wouldn't want the back button to show in this scenario
      this.nav.push(page.component);
    }
  }

  enableMenu(loggedIn: boolean) {
    console.log("loggedIn vale -> " + loggedIn);
    this.menu.enable(loggedIn, 'loggedInMenu');
    this.menu.enable(!loggedIn, 'loggedOutMenu');
  }

  doAuthLogout() {
      console.log("doAuthLogout");
      let alert = this.alertCtrl.create({
        title: '^Confirmación salida',
        message: '¿Quiere abandonar la aplicación?',
        buttons: [
          {
            text: '^Cancelar',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: '^Confirmar',
            handler: () => {
              console.log("seteamos a null los datos del usuario en storage");
              this.authService.logout().then((result) => {
                console.log('Logged out');
                this.enableMenu(false);
                //this.navCtrl.setRoot(LoginPage);
                this.nav.setRoot(LoginPage);
              }, (err) => {
                console.log('Logged out1');
                alert.dismiss();
              });
            }
          }
        ]
      });
      alert.present();
  }

}
