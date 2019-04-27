import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';

import {RegisterGroupRs, LoginRs} from '../../app/_dtos/index';
import {AuthService} from '../../app/_services/index';
import { IDetailedError } from '@ionic/cloud-angular';
import {memberGroupDto } from '../../app/_dtos/index';

/**
 * Generated class for the EditGroupPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-edit-group',
  templateUrl: 'edit-group.html',
})
export class EditGroupPage {

  RegisterGroupRs: RegisterGroupRs = new RegisterGroupRs();
  memberGroupDto: memberGroupDto = new memberGroupDto();
  number_members_group = 7; //comparo contra 7 porque el length del array comienza por cero....

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public alertController: AlertController,
    public alertCtrl: AlertController,
    public loadingCtrl:LoadingController,
    public authService: AuthService) {
    //console.log(this.navParams.data);
    //console.log(this.navParams.data.grupo);
    this.RegisterGroupRs = this.navParams.data.grupo;
    //console.log("nombre grupo -> " + this.RegisterGroupRs.group);
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad EditGroupPage');
  }

  delete(item){
    //console.log("item -> " + JSON.stringify(item));
    let pos = this.RegisterGroupRs.members.map(function(e) { return e.email; }).indexOf(item.email);
    //console.log("este mail está -> " + pos);
    this.RegisterGroupRs.members.splice(pos, 1);
    //console.log("borrado...");
  }

  finishParticipation(item){
    //console.log("vas a finalizar la participación en el grupo de -> " + item.email);
    //console.log("item -> " + JSON.stringify(item));

    let loginRs: LoginRs = JSON.parse(localStorage.getItem('user'));
    var d = new Date();
    var newItem = new memberGroupDto();
    newItem.createdBy = item.email;
    newItem.creationDate = item.creationDate;
    newItem.email = item.email;
    newItem.fecfin = d.toString();
    newItem.fecini = item.fecini;
    newItem.inquiry_number = item.inquiry_number;
    newItem.last_inquiry = item.last_inquiry;
    newItem.lupdateBy = loginRs.user.email;
    newItem.lupdateDate = d.toString();
    //console.log("new item -> " + JSON.stringify(newItem));

    let pos = this.RegisterGroupRs.members.map(function(e) { return e.email; }).indexOf(item.email);
    //console.log("este mail está -> " + pos);
    this.RegisterGroupRs.members.splice(pos, 1);
    this.RegisterGroupRs.members.push(newItem);

  }

  undo(item){
    //console.log("vas a volver a habilitar la participación en el grupo de -> " + item.email);
    //console.log("item -> " + JSON.stringify(item));

    let loginRs: LoginRs = JSON.parse(localStorage.getItem('user'));
    var newItem = new memberGroupDto();
    newItem.createdBy = item.email;
    newItem.creationDate = item.creationDate;
    newItem.email = item.email;
    newItem.fecfin = null;
    newItem.fecini = item.fecini;
    newItem.inquiry_number = item.inquiry_number;
    newItem.last_inquiry = item.last_inquiry;
    newItem.lupdateBy = loginRs.user.email;
    newItem.lupdateDate = item.lupdateDate;
    //console.log("new item -> " + JSON.stringify(newItem));

    let pos = this.RegisterGroupRs.members.map(function(e) { return e.email; }).indexOf(item.email);
    //console.log("este mail está -> " + pos);
    this.RegisterGroupRs.members.splice(pos, 1);
    this.RegisterGroupRs.members.push(newItem);

  }

  doUpdateGroup() {

      //console.log('Inicio proceso de registro...');
      //console.log('name -> ' + this.RegisterGroupRs.group);

      if(this.RegisterGroupRs.members.length == 0){
      //if(this.registerGroupRq.invitations.length == 0) {
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

      this.authService.updateGroup(this.RegisterGroupRs).then((registerResult) => {
        //console.log('ok register');
        let registerData: any = registerResult;
        this.RegisterGroupRs = registerData;
        let alert = this.alertCtrl.create({
          title:'^Register Message',
          subTitle:"^Register complete.",
          buttons:['OK']
        });
        alert.present();
        loader.dismissAll();
        this.navCtrl.pop();
      }, (err:IDetailedError<string[]>) => {
        loader.dismissAll();
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
          title:'^Update Error',
          subTitle:errors,
          buttons:['OK']
        });
        alert.present();
      });

  }

  async addInvitation() {
    let loginRs: LoginRs = JSON.parse(localStorage.getItem('user'));
    //console.log(this.number_members_group + " - " + this.RegisterGroupRs.members.length);
    if (this.number_members_group >= this.RegisterGroupRs.members.length){
      let alert = this.alertController.create({
        title: 'Introduce el mail del usuario al que quieres invitar a participar en tu grupo',
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
              //console.log('ok clicked');
              if (this.checkEmail(data.email)){
                let pos = this.RegisterGroupRs.members.map(function(e) { return e.email; }).indexOf(data.email);
                //console.log(itemAux + " este mail está -> " + pos);
                var d = new Date();
                if (pos == -1){
                  var newMem = new memberGroupDto();
                  newMem.createdBy = loginRs.user.email;
                  newMem.creationDate = d.toString();
                  newMem.email = data.email;
                  newMem.fecfin = null;
                  newMem.fecini = null;
                  newMem.inquiry_number = null;
                  newMem.last_inquiry = null;
                  newMem.lupdateBy = loginRs.user.email;
                  newMem.lupdateDate = d.toString();
                  this.RegisterGroupRs.members.push(newMem);
                }else{
                  let alert = this.alertCtrl.create({
                    title:'^Invitation Error',
                    subTitle:"The email already exists!",
                    buttons:['OK']
                  });
                  alert.present();
                  return;
                }
              }else{
                let alert = this.alertCtrl.create({
                  title:'^Invitation Error',
                  subTitle:"It's not a valid email",
                  buttons:['OK']
                });
                alert.present();
                return;
              }
            }
          }
        ]
      });
      alert.present();
    }else{
      let alert = this.alertCtrl.create({
        title:'^En la versión free no es posible añadir más de 8 miembros a un grupo',
        buttons:['OK']
      });
      alert.present();
    }
  }

  checkEmail(emailAddress) {
    var sQtext = '[^\\x0d\\x22\\x5c\\x80-\\xff]';
    var sDtext = '[^\\x0d\\x5b-\\x5d\\x80-\\xff]';
    var sAtom = '[^\\x00-\\x20\\x22\\x28\\x29\\x2c\\x2e\\x3a-\\x3c\\x3e\\x40\\x5b-\\x5d\\x7f-\\xff]+';
    var sQuotedPair = '\\x5c[\\x00-\\x7f]';
    var sDomainLiteral = '\\x5b(' + sDtext + '|' + sQuotedPair + ')*\\x5d';
    var sQuotedString = '\\x22(' + sQtext + '|' + sQuotedPair + ')*\\x22';
    var sDomain_ref = sAtom;
    var sSubDomain = '(' + sDomain_ref + '|' + sDomainLiteral + ')';
    var sWord = '(' + sAtom + '|' + sQuotedString + ')';
    var sDomain = sSubDomain + '(\\x2e' + sSubDomain + ')*';
    var sLocalPart = sWord + '(\\x2e' + sWord + ')*';
    var sAddrSpec = sLocalPart + '\\x40' + sDomain; // complete RFC822 email address spec
    var sValidEmail = '^' + sAddrSpec + '$'; // as whole string

    var reValidEmail = new RegExp(sValidEmail);

    return reValidEmail.test(emailAddress);
  }

}
