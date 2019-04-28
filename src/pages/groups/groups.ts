import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController} from 'ionic-angular';
import { Http } from '@angular/http';
import { TransactionService, AuthService } from '../../app/_services/index';
import { IDetailedError } from '@ionic/cloud-angular';

import { CreateGroupPage }  from '../../pages/create-group/create-group';
import { EditGroupPage }  from '../../pages/edit-group/edit-group';
import { StatsaccessPage } from '../../pages/statsaccess/statsaccess';

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
  number_of_groups = 3;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    public alertCtrl: AlertController,
    public loadingCtrl:LoadingController,
    public TransactionService: TransactionService,
    public AuthService : AuthService) {

      this.ionViewDidLoad();

  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad GroupsPage');
    this.TransactionService.getGroups().then((registerResult) => {
      //console.log('ok getGroups');
      let registerData: any = registerResult;
      this.RegisterGroupRs = registerData;
      //console.log("Datos -> " + JSON.stringify(this.RegisterGroupRs));
      this.groups = this.RegisterGroupRs;
    }, (err:IDetailedError<string[]>) => {
      let errors = '';
      for(let e of err.details) {
        //console.log(e);
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
    //console.log("el grupo es -> " + grupo);
    this.navCtrl.push(StatsaccessPage, { grupo });
  }

  createNewGroup(){
    //console.log("creando un nuevo grupo -> " + this.number_of_groups + " - " + this.groups.length);
    if (this.groups.length < this.number_of_groups){
      this.navCtrl.push(CreateGroupPage);
    }else{
      let alert = this.alertCtrl.create({
        title:'^En la versión free no pueden crearse más de tres grupos',
        buttons:['OK']
      });
      alert.present();
    }
  }

  navEditGroup(grupo){
    //console.log("editando el grupo -> " + grupo);
    this.navCtrl.push(EditGroupPage, { grupo } );
  }

  async finishGroup(grupo){
    const alert = await this.alertCtrl.create({
      title: '^Cerrar grupo!',
      subTitle: '^¿desea finalizar el grupo? podrá seguir consultando estádísticas pero no podrá modificarlo',
      buttons: [
        {
          text: '^Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: '^Confirmar',
          handler: () => {
            //console.log('Confirmar que quieres cerrar el grupo -> ' + grupo._id);
            var j = new Date();
            grupo.fecfin = j;
            this.AuthService.updateGroup(grupo).then((registerGroupRs) => {
              //console.log('ok acceptOrNotInvitation');
              //let registerData: any = registerResult;
              //this.RegisterInvitationsRs = registerData;
              //console.log("Datos -> " + JSON.stringify(this.RegisterInvitationsRs));
              //this.invitations = this.RegisterInvitationsRs;
              //this.delete(grupo);
            }, (err:IDetailedError<string[]>) => {
              let errors = '';
              for(let e of err.details) {
                //console.log(e);
                if(e === 'required_email') errors += '^Email is required.<br/>';
                if(e === 'required_password') errors += '^Password is required.<br/>';
                if(e === 'conflict_email') errors += '^A user with this email already exists.<br/>';
                //don't need to worry about conflict_username
                if(e === 'invalid_email') errors += 'Your email address isn\'t valid.';
              }
              let alert = this.alertCtrl.create({
                title:'^Finalice group error',
                subTitle:errors,
                buttons:['OK']
              });
              alert.present();
            });
          }
        }
      ]
    });

    await alert.present();
  }

}
