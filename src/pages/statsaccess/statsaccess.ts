import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the StatsaccessPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-statsaccess',
  templateUrl: 'statsaccess.html',
})
export class StatsaccessPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StatsaccessPage');
  }

  dayStats(){
    console.log("go to day stats");
  }

  weekStats(){
    console.log("go to week stats");
  }

  monthStats(){
    console.log("go to month stats");
  }

}
