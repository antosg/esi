import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { IDetailedError } from '@ionic/cloud-angular';
import { LoginRq, RegisterRq, RegisterRs } from '../../app/_dtos/dtos.component';
import { AuthService } from '../../app/_services/index';
import { LoginPage } from '../../app/_login/index';

/**
 * Generated class for the ResetpasswordPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-resetpassword',
  templateUrl: 'resetpassword.html',
})
export class ResetpasswordPage {

  loginRq = new LoginRq();
  registerRq: RegisterRq = new RegisterRq();
  registerRs: RegisterRs = new RegisterRs();

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public alertCtrl: AlertController,public loadingCtrl:LoadingController, public authService: AuthService) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad ResetpasswordPage');
  }

  sendEmailReset() {
    //console.log("sending email for reset....");

      if(this.loginRq.email === '' || this.loginRq.email === undefined) {
        let alert = this.alertCtrl.create({
          title:'^Sending email error',
          subTitle:'^All fields are required',
          buttons:['OK']
        });
        alert.present();
        return;
      }

      this.registerRq.email = this.loginRq.email;

      let loader = this.loadingCtrl.create({
        content: "^Sending email..."
      });
      loader.present();

      this.authService.forgot(this.registerRq).then((registerResult) => {
        //console.log('ok register');
        let registerData: any = registerResult;
        this.registerRs = registerData;
        let alert = this.alertCtrl.create({
          title:'^Email enviado',
          subTitle:"^dentro de unos minutos recibirá un email con un link desde el que podrá resetear el password",
          buttons:['OK']
        });
        alert.present();
        loader.dismissAll();
        this.navCtrl.setRoot(LoginPage);
      }, (err:IDetailedError<string[]>) => {
        loader.dismissAll();
        let errors = '';
        for(let e of err.details) {
          //console.log(e);
          if(e === 'required_email') errors += '^Email is required.<br/>';
          if(e === 'invalid_email') errors += 'Your email address isn\'t valid.';
        }
        let alert = this.alertCtrl.create({
          title:'^Error enviando email',
          subTitle:errors,
          buttons:['OK']
        });
        alert.present();
      });

  }

}
