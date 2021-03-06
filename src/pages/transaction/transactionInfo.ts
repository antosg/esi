import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { IDetailedError } from '@ionic/cloud-angular';
import {TransactionService} from '../../app/_services/index';
import {TransactionRs } from '../../app/_dtos/index';

@Component({
  selector: 'page-transactionInfo',
  templateUrl: 'transactionInfo.html'
})
export class TransactionInfoPage {

  isHiddenCard:boolean = false;
  transactionId: String='';
  transactionRs: TransactionRs = new TransactionRs();


  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public loadingCtrl:LoadingController,
  public transactionService: TransactionService) {}

  ionViewDidLoad() {
    //console.log('Hello TransactionInfoPage Page');
  }

  doGetTransaction() {
    if(!this.isHiddenCard) {
      //console.log('process register');


      if(this.transactionId === '') {
        let alert = this.alertCtrl.create({
          title:'Register Error',
          subTitle:'All fields are rquired',
          buttons:['OK']
        });
        alert.present();
        return;
      }

      let loader = this.loadingCtrl.create({
        content: "Retrieving transaction..."
      });
      loader.present();

      this.transactionService.retrieve(this.transactionId).then((retrievedResult) => {
        //console.log('ok create transaction');
        loader.dismiss();
        //console.log(retrievedResult);
        this.isHiddenCard = !this.isHiddenCard;
        let registerData: any = retrievedResult;
        this.transactionRs = registerData;

      }, (err:IDetailedError<string[]>) => {
        loader.dismissAll();
        let errors = '';
        for(let e of err.details) {
          console.log(e);
          if(e === 'required_userOrigin') errors += 'User from is required.<br/>';
          if(e === 'required_UserEnd') errors += 'User to is required.<br/>';
          if(e === 'requires_description') errors += 'You need to feed transaction descriptiondesription.<br/>';
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

    } else {
      this.isHiddenCard = !this.isHiddenCard ;
    }

  }

}
