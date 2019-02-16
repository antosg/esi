import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { AlertController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Device } from '@ionic-native/device';
import { AuthService } from '../../app/_services/index';

import { ImagePicker } from '@ionic-native/image-picker';
import { Base64 } from '@ionic-native/base64';
import { userPreferencesRq, userPreferencesRsp } from '../../app/_dtos/index';
import { UserDetails, IDetailedError } from '@ionic/cloud-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { Events } from 'ionic-angular';

declare const FCMPlugin: any;

/**
 * Generated class for the PreferencesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-preferences',
  templateUrl: 'preferences.html',
})
export class PreferencesPage {

  languageApp: string;
  activateNotification : any;
  regData = { avatar:'', language:'', swipush:'', token:'' };
  //let imgPreview = 'assets/imgs/blank-avatar.jpg';
  imgPreview = 'assets/img/blank-avatar.png';
  loading: any;
  newImg : any;
  token: string;
  userPreferencesRsp: userPreferencesRsp = new userPreferencesRsp();

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private device: Device,
    private alertCtrl: AlertController,
    public translate: TranslateService,
    public loadingCtrl:LoadingController,
    private imagePicker: ImagePicker,
    private base64: Base64,
    public events: Events,
    private sanitizer: DomSanitizer,
    public authService: AuthService) {

      //console.log('Device UUID is: ' + this.device.uuid);
      //this.token = this.device.uuid;

  }

  getPhoto() {
    this.newImg = null;
    let options = {
      maximumImagesCount: 1
    };
    this.imagePicker.getPictures(options).then((results) => {
      for (var i = 0; i < results.length; i++) {
          this.imgPreview = results[i];
          this.base64.encodeFile(results[i]).then((base64File: string) => {
            this.regData.avatar = base64File;
          }, (err) => {
            console.log(err);
          });
      }
    }, (err) => { });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PreferencesPage');
    //Cargo en el formulario los valores guardado en storage.....
    let val = localStorage.getItem('languageApp');

    if (val != null && val != ""){

      console.log('languageApp -> ', val);
      this.languageApp = val;

      let val2 = localStorage.getItem('topic');
      console.log('topic -> ', val2);
      if (val2 === 'notificar'){
        this.activateNotification = true;
      }else{
        this.activateNotification = false;
      }

    }

    console.log("newImg -> " + this.newImg);
    if (this.newImg == null || this.newImg == "" || this.newImg == undefined){
      this.authService.recoverUserPreferences().then((preferencesResult) => {
        console.log('ok recoverPreferencesData');
        let preferencesData: any = preferencesResult;
        this.userPreferencesRsp = preferencesData;
        //transformo a lower el idioma
        //this.registerRs.language = this.registerRs.language.toLowerCase();
        //console.log("Datos1 -> " + JSON.stringify(this.userPreferencesRsp));
        //console.log("avatar -> " + this.userPreferencesRsp.preferences.avatar);

        if (val == null && val == ""){
          console.log("val es igual a nulll");
            this.languageApp = this.userPreferencesRsp.language.toLowerCase();
            if (this.userPreferencesRsp.preferences.swipush == "S"){
              this.activateNotification = true;
            }else{
              this.activateNotification = false;
            }

            if (this.userPreferencesRsp.preferences.avatar != null && this.userPreferencesRsp.preferences.avatar != ""){
              this.newImg = this.userPreferencesRsp.preferences.avatar;
            }
        }else{
          console.log("val NO es igual a nulll");
          console.log("avatar -> " + this.userPreferencesRsp.preferences.avatar);
          //this.newImg = this.sanitizer.bypassSecurityTrustResourceUrl(this.userPreferencesRsp.preferences.avatar);
          if (this.userPreferencesRsp.preferences.avatar != null && this.userPreferencesRsp.preferences.avatar != ""){
            this.newImg = this.userPreferencesRsp.preferences.avatar;
          }
        }

          //console.log("Datos2 -> " + JSON.stringify(this.userPreferencesRsp));

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
  }

  doSaveChanges(){

    console.log("dentro de doSaveChanges...." + this.languageApp);

    //guardamos en preferences el valor que nos pasan....
    localStorage.setItem('languageApp', this.languageApp);
    this.regData.language = this.languageApp;

    FCMPlugin.onTokenRefresh(function(token){
      console.log("token generado...." + token );
      this.token = token;
    });

    FCMPlugin.getToken(function(token){
        this.regData.token = this.token;
    });

    if (this.activateNotification){
      console.log("checked true...");
      localStorage.setItem('topic', 'notificar');
      this.regData.swipush = "S";
      FCMPlugin.subscribeToTopic('notificar');
    }else{
      console.log("checked false...");
      localStorage.setItem('topic', 'nonotificar');
      this.regData.swipush = "N";
      FCMPlugin.unsubscribeFromTopic('notificar');
    }

    let userData : userPreferencesRq = new userPreferencesRq();
    userData.avatar = this.regData.avatar;
    userData.language = this.regData.language;
    userData.swipush = this.regData.swipush;
    userData.token = this.regData.token;

    this.showLoader();
    this.authService.modifyUserPreferences(userData).then((registerResult) => {
    //this.api.register(this.regData).subscribe((result) => {
      this.loading.dismiss();
      let alert = this.alertCtrl.create({
        title: '' + this.translate.get('CHANGES_SAVED'),
        subTitle: '',
        buttons: ['OK']
      });
      //avisamos de que el usuario se ha logeado para cambiar la imagen también en el menú...
      this.events.publish('user:logged');
      alert.present();
    }, (err) => {
      console.log(err);
      this.loading.dismiss();
      let alert = this.alertCtrl.create({
        title: 'Registration Failed',
        subTitle: 'Oh no! Your registration is failed',
        buttons: ['OK']
      });
      alert.present();
    });

  }

  showLoader(){
    this.loading = this.loadingCtrl.create({
        content: 'Submitting...'
    });

    this.loading.present();
  }

}
