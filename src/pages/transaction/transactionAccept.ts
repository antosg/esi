import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { UserDetails, IDetailedError } from '@ionic/cloud-angular';
import { HomePage } from '../../pages/home/home';
import {TransactionService} from '../../app/_services/index';
import {MapperDto} from '../../app/_mapper/index';
import {TransactionAcceptRs, LoginRq} from '../../app/_dtos/index';

@Component({
  selector: 'page-transactionAccept',
  templateUrl: 'transactionAccept.html'
})
export class TransactionAcceptPage {

  isHiddenCard:boolean = false;
  transactionId: String='';
  transactionAcceptRs: TransactionAcceptRs = new TransactionAcceptRs();


  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public loadingCtrl:LoadingController,
  private toastCtrl: ToastController, public transactionService: TransactionService, private mapper: MapperDto) {}

  ionViewDidLoad() {
    //console.log('Hello TransactionInfoPage Page');
  }

  doAcceptTransaction() {
    if(!this.isHiddenCard) {
      //console.log('process transaction accept');


      if(this.transactionId === '') {
        let alert = this.alertCtrl.create({
          title:'Transaction Error',
          subTitle:'All fields are rquired',
          buttons:['OK']
        });
        alert.present();
        return;
      }

      let loader = this.loadingCtrl.create({
        content: "Accepting transaction..."
      });
      loader.present();

      this.transactionService.accept(this.transactionId).then((acceptedResult) => {
        //console.log('ok create transaction');
        loader.dismiss();
        //console.log(acceptedResult);
        this.isHiddenCard = !this.isHiddenCard;
        let registerData: any = acceptedResult;
        this.transactionAcceptRs = registerData;

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
