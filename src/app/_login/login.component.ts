import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, MenuController, Events  } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';
import { RegisterPage } from '../../pages/register/register';
import { ResetpasswordPage } from '../../pages/resetpassword/resetpassword';
import { RepServices } from '../providers/rep-services';
import { AuthService } from '../_services/index';
import { MapperDto } from '../_mapper/index';
import { LoginRq } from '../_dtos/index';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [RepServices]
})
export class LoginPage {

  showLogin:boolean = true;
  email:string = '';
  password:string = '';
  name:string = '';


  loading: any;
  loginRq = new LoginRq();//{ email:'villenita@gmail.com', password:'villenita43' };
  data: any;

  constructor(public navCtrl: NavController,
    public alertCtrl: AlertController,
    public loadingCtrl:LoadingController,
  private repServices: RepServices,
  public authService: AuthService,
      public events: Events,
  public mapper: MapperDto, public menu: MenuController) {

    events.subscribe('logout', () => {
      this.doAuthLogout();
    });
  }

  ionViewDidLoad() {
    //console.log('Hello LoginPage Page');
  }

  /*
  for both of these, if the right form is showing, process the form,
  otherwise show it
  */
  doLogin() {
    //console.log("doLogin");
    if(this.showLogin) {
      //console.log('process login');
      //this.email = "villenita@gmail.com";
      //this.password = "villenita43";

      if(this.email === '' || this.password === '') {
        let alert = this.alertCtrl.create({
          title:'^Register Error',
          subTitle:'^All fields are required',
          buttons:['OK']
        });
        alert.present();
        return;
      }

      let loader = this.loadingCtrl.create({
        content: "^Logging in..."
      });
      loader.present();

      this.repServices.loginRep(this.email, this.password).then(() => {
        //console.log('ok i guess?');
        loader.dismissAll();
        this.navCtrl.setRoot(HomePage);
      }, (err) => {
        loader.dismissAll();
        //console.log(err.message);

        let errors = '';
        if(err.message === 'UNPROCESSABLE ENTITY') errors += 'Email isn\'t valid.<br/>';
        if(err.message === 'UNAUTHORIZED') errors += 'Password is required.<br/>';

        let alert = this.alertCtrl.create({
          title:'^Login Error',
          subTitle:errors,
          buttons:['OK']
        });
        alert.present();
      });
    } else {
      this.showLogin = true;
    }
  }

  doAuthLogout() {
      //console.log("doAuthLogout");
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
              //console.log("seteamos a null los datos del usuario en storage");
              this.authService.logout().then((result) => {
                //console.log('Logged out');
                this.enableMenu(false);
                this.navCtrl.setRoot(LoginPage);
              }, (err) => {
                //console.log('Logged out1');
                alert.dismiss();
              });
            }
          }
        ]
      });
      alert.present();
  }

  doAuthLogin() {
      //console.log("doAuthLogin....");
      let loader = this.loadingCtrl.create({
        content: "^Logging in..."
      });
      loader.present();
      this.authService.login(this.loginRq).then((result) => {
      loader.dismissAll();
      this.data = result;

      localStorage.setItem('token', this.data.token);
      localStorage.setItem('user', JSON.stringify(this.data));
      this.enableMenu(true);
      //let loginRs: LoginRs = JSON.parse(localStorage.getItem('user'));
       //console.log(loginRs);
       this.navCtrl.setRoot(HomePage);
    }, (err) => {
      loader.dismissAll();
    });
  }

  enableMenu(loggedIn: boolean) {
    this.menu.enable(loggedIn, 'loggedInMenu');
    this.menu.enable(!loggedIn, 'loggedOutMenu');
  }

  doRegister() {
    this.navCtrl.push(RegisterPage);
  }

  doResetPassword() {
    this.navCtrl.push(ResetpasswordPage);
  }


/*
  doSearch() {
    this.navCtrl.push(SearchUserPage);
    if(!this.showLogin) {
      console.log('process doSearch');

      /*
      if(this.name === '' || this.email === '' || this.password === '') {
        let alert = this.alertCtrl.create({
          title:'Register Error',
          subTitle:'All fields are rquired',
          buttons:['OK']
        });
        alert.present();
        return;
      }

      let details: UserDetails = {'email':this.email, 'password':this.password, 'name':this.name};
      console.log(details);

      let loader = this.loadingCtrl.create({
        content: "Registering your account..."
      });
      loader.present();

      this.auth.signup(details).then(() => {
        console.log('ok signup');
        this.auth.login('basic', {'email':details.email, 'password':details.password}).then(() => {
          loader.dismissAll();
          this.navCtrl.setRoot(HomePage);
        });

      }, (err:IDetailedError<string[]>) => {
        loader.dismissAll();
        let errors = '';
        for(let e of err.details) {
          console.log(e);
          if(e === 'required_email') errors += 'Email is required.<br/>';
          if(e === 'required_password') errors += 'Password is required.<br/>';
          if(e === 'conflict_email') errors += 'A user with this email already exists.<br/>';
          //don't need to worry about conflict_username
          if(e === 'invalid_email') errors += 'Your email address isn\'t valid.';
        }
        let alert = this.alertCtrl.create({
          title:'Register Error',
          subTitle:errors,
          buttons:['OK']
        });
        alert.present();
      });
    */
/*    } else {
      this.showLogin = false;
    }

  }
*/

}
