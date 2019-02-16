import { Component } from '@angular/core';
import { IonicPage, Platform, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { suggestionRq} from '../../app/_dtos/index';

import { LoginRs} from '../../app/_dtos/index';
import { Http, Headers } from '@angular/http';

//client url
let apiUrl = 'https://reponline.herokuapp.com/';
//transaction creation endpoint
let sendsuggestionUrl = 'api/v1/user/sendsuggestion';

/**
 * Generated class for the SuggestionPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-suggestion',
  templateUrl: 'suggestion.html',
})
export class SuggestionPage {

  suggestionRq: suggestionRq = new suggestionRq();
  userObj:LoginRs = new LoginRs();
  public unregisterBackButtonAction: any;

  constructor(public platform: Platform,
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public loadingCtrl:LoadingController,
    public http: Http,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SuggestionPage');
  }

  reload(){
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }

  doSuggestion() {
    console.log("dentro de doSuggestion..." + this.suggestionRq.suggestion);

    if(this.suggestionRq.suggestion === '' || this.suggestionRq.suggestion === undefined) {
      let alert = this.alertCtrl.create({
        title:'^Register Error',
        subTitle:'^The suggestion field is required',
        buttons:['OK']
      });
      alert.present();
      return;
    }

    let loader = this.loadingCtrl.create({
      content: "^Sending your suggestion..."
    });
    loader.present();

    return new Promise((resolve, reject) => {
        //let loginRs: LoginRs = new LoginRs();
        let loginRs: LoginRs = JSON.parse(localStorage.getItem('user'));
          console.log("user1 -> " + loginRs.user.email);

          let headers = new Headers();
          headers.append('x-access-token', loginRs.token);
          headers.append('x-key', loginRs.user.email);
          headers.append('Content-Type', 'application/json');

          this.http.post(apiUrl+sendsuggestionUrl, JSON.stringify(this.suggestionRq), {headers: headers})
            .subscribe(res => {
              resolve(res.json());
              loader.dismissAll();
              this.navCtrl.setRoot(this.navCtrl.getActive().component);
            }, (err) => {
              reject(err);
            });


    });



  }

}
