import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController} from 'ionic-angular';
import { Http } from '@angular/http';
import { TransactionService } from '../../app/_services/index';
import { IDetailedError } from '@ionic/cloud-angular';

import { StatisticsPage } from '../../pages/statistics/statistics';
import { CreateGroupPage }  from '../../pages/create-group/create-group';
import { EditGroupPage }  from '../../pages/edit-group/edit-group';

import {RegisterGroupRs} from '../../app/_dtos/index';

/**
 * Generated class for the GroupsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-groups',
  templateUrl: 'groups.html',
})
export class GroupsPage {

  RegisterGroupRs: RegisterGroupRs = new RegisterGroupRs();
  groups: any = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    public alertCtrl: AlertController,
    public loadingCtrl:LoadingController,
    public TransactionService: TransactionService) {

      this.ionViewDidLoad();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GroupsPage');
    this.TransactionService.getGroups().then((registerResult) => {
      console.log('ok getGroups');
      let registerData: any = registerResult;
      this.RegisterGroupRs = registerData;
      console.log("Datos -> " + JSON.stringify(this.RegisterGroupRs));
      this.groups = this.RegisterGroupRs;
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
        title:'^Recover unser groups error',
        subTitle:errors,
        buttons:['OK']
      });
      alert.present();
    });
  }

  navStatistics(grupo){
    console.log("el grupo es -> " + grupo);
    this.navCtrl.push(StatisticsPage);
  }

  createNewGroup(){
    console.log("creando un nuevo grupo");
    this.navCtrl.push(CreateGroupPage);
  }

  navEditGroup(grupo){
    console.log("editando el grupo -> " + grupo);
    this.navCtrl.push(EditGroupPage);
  }

  finishGroup(grupo){
    console.log("finalizar grupo");
  }

}
