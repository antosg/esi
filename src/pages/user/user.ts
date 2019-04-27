import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';

import { Http } from '@angular/http';
import {AuthService} from '../../app/_services/index';
import {RegisterRq, RegisterRs, LoginRq, LoginRs, modifyUserRq} from '../../app/_dtos/index';
import { UserDetails, IDetailedError } from '@ionic/cloud-angular';

/**
 * Generated class for the UserPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {

  languages: any;
  countries: any;
  registerRs: RegisterRs = new RegisterRs();

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public authService: AuthService,
    public alertCtrl: AlertController,
    public loadingCtrl:LoadingController,
    public http: Http) {

      this.http.get('https://reponline.herokuapp.com/masters/languages/en').map(res => res.json()).subscribe(data => {
          this.languages = data.items;
          //console.log("languages -> " + this.languages);
      })

      this.http.get('https://reponline.herokuapp.com/masters/countries/en').map(res => res.json()).subscribe(data => {
          this.countries = data.items;
          //console.log("countries -> " + this.languages);
      });

      this.authService.recoverUserData().then((registerResult) => {
        //console.log('ok recoverUserData');
        //no hace falta logearse, porque el usuario está inactivo hasta que reciba el mail y haga
        //click en el enlace, sólo después de esa acción el usuario está en disposición de hacer
        //un login.... por esto comento este trozo de código....
        /*
        this.mapper.registerRqToLoginRq(this.registerRq);
        this.authService.login(this.mapper.registerRqToLoginRq(this.registerRq)).then((result) => {
          loader.dismissAll();
              let data: any = result;
              localStorage.setItem('token', data.token);
              localStorage.setItem('user', JSON.stringify(data));
              let loginRs: LoginRs = JSON.parse(localStorage.getItem('user'));
              console.log(loginRs);
          this.navCtrl.setRoot(HomePage);
        });*/
        let registerData: any = registerResult;
        this.registerRs = registerData;
        //transformo a lower el idioma
        this.registerRs.language = this.registerRs.language.toLowerCase();
          //console.log("Datos -> " + JSON.stringify(this.registerRs));
      }, (err:IDetailedError<string[]>) => {
        let errors = '';
        for(let e of err.details) {
          console.log(e);
          if(e === 'required_email') errors += '^Email is required.<br/>';
          if(e === 'required_password') errors += '^Password is required.<br/>';
          if(e === 'conflict_email') errors += '^A user with this email already exists.<br/>';
          //don't need to worry about conflict_username
          if(e === 'invalid_email') errors += 'Your email address isn\'t valid.';
        }
        let alert = this.alertCtrl.create({
          title:'^Recover unser info error',
          subTitle:errors,
          buttons:['OK']
        });
        alert.present();
      });

  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad UserPage ' + localStorage.getItem('user'));
  }

  doUpdateUserInfo(){
    //console.log("doUpdateUserInfo....")

    if(
    this.registerRs.name === '' || this.registerRs.name === undefined
    || this.registerRs.name === '' || this.registerRs.name === undefined
    || this.registerRs.surname === '' || this.registerRs.surname === undefined
    || this.registerRs.country === '' || this.registerRs.country === undefined
    || this.registerRs.language === '' || this.registerRs.language === undefined) {
      let alert = this.alertCtrl.create({
        title:'^Modify user Data Error',
        subTitle:'^All fields are required',
        buttons:['OK']
      });
      alert.present();
      return;
    }

    let loader = this.loadingCtrl.create({
      content: "^Registering your account..."
    });
    loader.present();

    let userInfo : modifyUserRq = new modifyUserRq();
    userInfo.name = this.registerRs.name;
    userInfo.surname = this.registerRs.surname;
    userInfo.country = this.registerRs.country;
    userInfo.language = this.registerRs.language;

    this.authService.modifyUserData(userInfo).then((registerResult) => {
      //console.log('ok modificar datos usuario');
      let registerData: any = registerResult;
      this.registerRs = registerData;
      let alert = this.alertCtrl.create({
        title:'^Modify User Data',
        subTitle:"^The user data has been modified!!",
        buttons:['OK']
      });
      let loginRs: LoginRs = JSON.parse(localStorage.getItem('user'));
      loginRs.user.name = userInfo.name;
      loginRs.user.surname = userInfo.surname;
      localStorage.setItem('user', JSON.stringify(loginRs));
      alert.present();
      loader.dismissAll();
      this.navCtrl.setRoot(this.navCtrl.getActive().component);
    }, (err:IDetailedError<string[]>) => {
      loader.dismissAll();
      let errors = '';
      for(let e of err.details) {
        console.log(e);
        if(e === 'required_email') errors += '^Email is required.<br/>';
        if(e === 'required_password') errors += '^Password is required.<br/>';
        if(e === 'conflict_email') errors += '^A user with this email already exists.<br/>';
        //don't need to worry about conflict_username
        if(e === 'invalid_email') errors += 'Your email address isn\'t valid.';
      }
      let alert = this.alertCtrl.create({
        title:'^Register Error',
        subTitle:errors,
        buttons:['OK']
      });
      alert.present();
    });

  }

}
