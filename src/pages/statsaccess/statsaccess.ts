import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {RegisterGroupRs, LoginRs} from '../../app/_dtos/index';

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

  RegisterGroupRs: RegisterGroupRs = new RegisterGroupRs();

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    //busco si a esta página llego desde el menú o desde mis grupos...
    console.log(this.navParams.data);
    console.log(this.navParams.data.grupo);
    this.RegisterGroupRs = this.navParams.data.grupo;
    console.log("nombre grupo -> " + this.RegisterGroupRs.group);

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
