import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {RegisterGroupRs } from '../../app/_dtos/index';
import { StatisticsPage } from '../../pages/statistics/statistics';
import { WeekstatsPage } from '../../pages/weekstats/weekstats';

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
  textGraphic : any;
  isGroup : any;
      mygroup : any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    //busco si a esta página llego desde el menú o desde mis grupos...
    //console.log(this.navParams.data);
    if (this.navParams.data.grupo != null || this.navParams.data.grupo != undefined){
      //console.log(this.navParams.data.grupo);
      this.RegisterGroupRs = this.navParams.data.grupo;
      //console.log("nombre grupo -> " + this.RegisterGroupRs.group);
      this.textGraphic = "para " + this.RegisterGroupRs.group
      this.isGroup = true;
    }else{
      //console.log("nombre grupo -> null");
      this.textGraphic = "de tus grupos";
      this.isGroup = false;
    }

  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad StatsaccessPage');
  }

  dayStats(){
    //console.log("go to day stats");
    if (this.isGroup){
      this.navCtrl.push(StatisticsPage, { item : this.RegisterGroupRs});
    }else{
      this.navCtrl.push(StatisticsPage, {});
    }

  }

  weekStats(){
    //console.log("go to week stats");
    if (this.isGroup){
      this.navCtrl.push(WeekstatsPage, { item : this.RegisterGroupRs});
    }else{
      this.navCtrl.push(WeekstatsPage, {});
    }
  }

  monthStats(){
    console.log("go to month stats");
  }

}
