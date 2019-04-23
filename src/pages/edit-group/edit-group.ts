import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ToastController  } from 'ionic-angular';

import {RegisterGroupRs, LoginRs} from '../../app/_dtos/index';
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
  number_members_group = 8;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public alertController: AlertController,
    public alertCtrl: AlertController) {
    console.log(this.navParams.data);
    console.log(this.navParams.data.grupo);
    this.RegisterGroupRs = this.navParams.data.grupo;
    console.log("nombre grupo -> " + this.RegisterGroupRs.group);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditGroupPage');
  }

  delete(item){
    console.log("item -> " + item);
    //let pos = this.items.indexOf(item);
    //console.log("pos -> " + pos);
    //this.items.splice(pos, 1);
  }

  finishParticipation(item){
    console.log("item -> " + item);
  }

  async addInvitation() {
    let loginRs: LoginRs = JSON.parse(localStorage.getItem('user'));
    console.log(this.number_members_group + " - " + this.RegisterGroupRs.members.length);
    if (this.number_members_group > this.RegisterGroupRs.members.length){
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
              console.log('ok clicked');
              if (this.checkEmail(data.email)){
                var itemAux = { "email" : data.email };
                let pos = this.RegisterGroupRs.members.map(function(e) { return e.email; }).indexOf(data.email);
                console.log(itemAux + " este mail está -> " + pos);
                var d = new Date();
                if (pos == -1){
                  this.memberGroupDto.createdBy = loginRs.user.email;
                  this.memberGroupDto.creationDate = d.toString();
                  this.memberGroupDto.email = data.email;
                  this.memberGroupDto.fecfin = null;
                  this.memberGroupDto.fecini = null;
                  this.memberGroupDto.inquiry_number = null;
                  this.memberGroupDto.last_inquiry = null;
                  this.memberGroupDto.lupdateBy = loginRs.user.email;
                  this.memberGroupDto.lupdateDate = d.toString();
                  this.RegisterGroupRs.members.push(this.memberGroupDto);
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
