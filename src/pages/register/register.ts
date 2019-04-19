import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { UserDetails, IDetailedError } from '@ionic/cloud-angular';
import { HomePage } from '../../pages/home/home';
import { LoginPage} from '../../app/_login/index';
import {AuthService} from '../../app/_services/index';
import {MapperDto} from '../../app/_mapper/index';
import {TermsPage} from '../../pages/terms/terms';
import {RegisterRq, RegisterRs, LoginRq, LoginRs} from '../../app/_dtos/index';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  languages: any;
  countries: any;

  isHiddenRegisterCard:boolean = false;
  registerRq: RegisterRq = new RegisterRq();
  registerRs: RegisterRs = new RegisterRs();


  constructor(public navCtrl: NavController,
    public alertCtrl: AlertController,
    public loadingCtrl:LoadingController,
    private toastCtrl: ToastController,
    public authService: AuthService,
    private mapper: MapperDto,
    public http: Http) {
    this.http.get('https://reponline.herokuapp.com/masters/languages/en').map(res => res.json()).subscribe(data => {
        this.languages = data.items;
        console.log("languages -> " + this.languages);
    })

    this.http.get('https://reponline.herokuapp.com/masters/countries/en').map(res => res.json()).subscribe(data => {
        this.countries = data.items;
        console.log("countries -> " + this.languages);
    })

  }

  ionViewDidLoad() {
    console.log('Hello RegisterPage Page');
  }
S
  doTc(){
    console.log("dentro de tos....");
    this.navCtrl.push(TermsPage);
  }

  doRegister() {

    if(!this.isHiddenRegisterCard) {

      console.log('Inicio proceso de registro...');
      console.log('name -> ' + this.registerRq.name + ' terms -> ' + this.registerRq.terms);

      if (!this.registerRq.terms){
        let alert = this.alertCtrl.create({
          title:'^Register Error',
          subTitle:'^You must accept the terms and conditions',
          buttons:['OK']
        });
        alert.present();
        return;
      }

      console.log('Inicio2');

      if(
      this.registerRq.name === '' || this.registerRq.name === undefined
      || this.registerRq.name === '' || this.registerRq.name === undefined
      || this.registerRq.email === '' || this.registerRq.email === undefined
      || this.registerRq.password === '' || this.registerRq.password === undefined
      || this.registerRq.passwordRepeat === '' || this.registerRq.passwordRepeat === undefined
      || this.registerRq.surname === '' || this.registerRq.surname === undefined
      || this.registerRq.country === '' || this.registerRq.country === undefined
      || this.registerRq.language === '' || this.registerRq.language === undefined) {
        let alert = this.alertCtrl.create({
          title:'^Register Error',
          subTitle:'^All fields are rquired',
          buttons:['OK']
        });
        alert.present();
        return;
      }

      if (this.registerRq.password !== this.registerRq.passwordRepeat){
        let alert = this.alertCtrl.create({
          title:'^Register Error',
          subTitle:'^The two passwords are diferents',
          buttons:['OK']
        });
        alert.present();
        return;
      }

      let loader = this.loadingCtrl.create({
        content: "^Registering your account..."
      });
      loader.present();

      this.authService.register(this.registerRq).then((registerResult) => {
        console.log('ok register');
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
        let alert = this.alertCtrl.create({
          title:'^Register Message',
          subTitle:"^Register complete. You will receive an email for activate your user.",
          buttons:['OK']
        });
        alert.present();
        loader.dismissAll();
        this.navCtrl.setRoot(LoginPage);
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

    } else {
      this.isHiddenRegisterCard = !this.isHiddenRegisterCard ;
    }

  }

  initializeRegisterRq() {
    var tmp = new RegisterRq();
    tmp.email = "email@email.com";
    tmp.name = "juan";
    tmp.surname = "juan";
    tmp.country = "spain";
    tmp.language = "español";
    tmp.terms = true;
    tmp.password = "xxxxx";
    tmp.passwordRepeat = "xxxxx";
    return tmp;
  }

}
