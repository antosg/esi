import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { ResetRq, RegisterRs } from '../../app/_dtos/dtos.component';
import { AuthService } from '../../app/_services/index';
import { LoginPage } from '../../app/_login/index';
import { IDetailedError } from '@ionic/cloud-angular';

/**
 * Generated class for the ChangepasswordPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
  segment: 'changepassword/:token'
})
@Component({
  selector: 'page-changepassword',
  templateUrl: 'changepassword.html',
})
export class ChangepasswordPage {

  resetRq = new ResetRq();
  registerRs: RegisterRs = new RegisterRs();

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public alertCtrl: AlertController,public loadingCtrl:LoadingController, public authService: AuthService) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad ChangepasswordPage');
  }

  sendPasswordReset() {

    //console.log("sending email for reset....");

      if(this.resetRq.password === '' || this.resetRq.password === undefined ||
          this.resetRq.confirm === '' || this.resetRq.confirm === undefined ) {
        let alert = this.alertCtrl.create({
          title:'^Sending reset password',
          subTitle:'^All fields are required',
          buttons:['OK']
        });
        alert.present();
        return;
      }

      if(this.resetRq.password != this.resetRq.confirm ) {
        let alert = this.alertCtrl.create({
          title:'^Sending reset password',
          subTitle:'differents passwords',
          buttons:['OK']
        });
        alert.present();
        return;
      }

      let loader = this.loadingCtrl.create({
        content: "^Sending..."
      });
      loader.present();

      this.authService.reset(this.resetRq, this.navParams.get('token')).then((registerResult) => {
        //console.log('ok register');
        let registerData: any = registerResult;
        this.registerRs = registerData;
        let alert = this.alertCtrl.create({
          title:'^Password cambiado',
          subTitle:"",
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
          title:'^Error cambiando password',
          subTitle:errors,
          buttons:['OK']
        });
        alert.present();
      });

  }

}
