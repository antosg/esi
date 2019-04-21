import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

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

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public alertController: AlertController) {

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


}
