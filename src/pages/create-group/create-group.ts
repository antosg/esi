import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ToastController  } from 'ionic-angular';
import { UserDetails, IDetailedError } from '@ionic/cloud-angular';
import { Http } from '@angular/http';

import {RegisterGroupRq} from '../../app/_dtos/index';
import {RegisterGroupRs} from '../../app/_dtos/index';
import {AuthService} from '../../app/_services/index';
import { GroupsPage} from '../groups/groups';


/**
 * Generated class for the CreateGroupPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-create-group',
  templateUrl: 'create-group.html',
})
export class CreateGroupPage {

 items : Array<{ email: string}>;
 registerGroupRq: RegisterGroupRq = new RegisterGroupRq();
 registerGroupRs: RegisterGroupRs = new RegisterGroupRs();

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public alertController: AlertController,
    public alertCtrl: AlertController,
    public loadingCtrl:LoadingController,
    public authService: AuthService,
  ) {

      this.items = [{"email":"xxxxxxx@gmail.com"},{"email":"yyyyyyy@gmail.com"}];

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateGroupPage');
  }

  delete(item){
    console.log("item -> " + item);
    let pos = this.items.indexOf(item);
    console.log("pos -> " + pos);
    this.items.splice(pos, 1);
  }

  async addInvitation() {
    let alert = this.alertController.create({
      title: 'Introduce el mail del usuario al que quieres invitar',
      inputs: [
        {
          name: 'email',
          placeholder: ''
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'OK',
          handler: data => {
            console.log('ok clicked');
            this.items.push({"email":data.email});
          }
        }
      ]
    });
    alert.present();
  }

  doRegister() {

      console.log('Inicio proceso de registro...');
      console.log('name -> ' + this.registerGroupRq.group);

      if (this.registerGroupRq.group === '' || this.registerGroupRq.group === undefined){
        let alert = this.alertCtrl.create({
          title:'^Register Error',
          subTitle:'^We need a group name',
          buttons:['OK']
        });
        alert.present();
        return;
      }

      console.log('Inicio2');

      if(this.registerGroupRq.invitations.length == 0) {
        let alert = this.alertCtrl.create({
          title:'^Register Error',
          subTitle:'^You need almost one user in your group',
          buttons:['OK']
        });
        alert.present();
        return;
      }

      let loader = this.loadingCtrl.create({
        content: "^Registering your group..."
      });
      loader.present();

      this.authService.register(this.registerGroupRq).then((registerResult) => {
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
        this.registerGroupRs = registerData;
        let alert = this.alertCtrl.create({
          title:'^Register Message',
          subTitle:"^Register complete.",
          buttons:['OK']
        });
        alert.present();
        loader.dismissAll();
        this.navCtrl.setRoot(GroupsPage);
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
