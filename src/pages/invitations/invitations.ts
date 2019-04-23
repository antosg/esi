import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController} from 'ionic-angular';
import { Http } from '@angular/http';
import { TransactionService } from '../../app/_services/index';
import { IDetailedError } from '@ionic/cloud-angular';

import {RegisterInvitationsRs} from '../../app/_dtos/index';

/**
 * Generated class for the InvitationsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-invitations',
  templateUrl: 'invitations.html',
})
export class InvitationsPage {

  RegisterInvitationsRs: RegisterInvitationsRs = new RegisterInvitationsRs();
  invitations: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
      public http: Http,
      public alertCtrl: AlertController,
      public loadingCtrl:LoadingController,
      public TransactionService: TransactionService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InvitationsPage');
    this.TransactionService.getInvitations().then((registerResult) => {
      console.log('ok getGroups');
      let registerData: any = registerResult;
      this.RegisterInvitationsRs = registerData;
      console.log("Datos -> " + JSON.stringify(this.RegisterInvitationsRs));
      this.invitations = this.RegisterInvitationsRs;
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
        title:'^Recover user invitations error',
        subTitle:errors,
        buttons:['OK']
      });
      alert.present();
    });
  }

  accept(inv){
    console.log("has aceptado participar en el grupo -> " + inv._id);
    console.log("Datos -> " + JSON.stringify(inv));
    this.TransactionService.acceptOrNotInvitation(inv).then((registerResult) => {
      console.log('ok acceptOrNotInvitation');
      //let registerData: any = registerResult;
      //this.RegisterInvitationsRs = registerData;
      //console.log("Datos -> " + JSON.stringify(this.RegisterInvitationsRs));
      //this.invitations = this.RegisterInvitationsRs;
      this.delete(inv);
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
        title:'^AcceptOrNot invitations error',
        subTitle:errors,
        buttons:['OK']
      });
      alert.present();
    });
  }

  delete(item){
    console.log("item -> " + item);
    let pos = this.invitations.indexOf(item);
    console.log("pos -> " + pos);
    this.invitations.splice(pos, 1);
  }

}
