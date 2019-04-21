import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { StatisticsPage } from '../../pages/statistics/statistics';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GroupsPage');
  }

  navStatistics(grupo){
    console.log("el grupo es -> " + grupo);
    this.navCtrl.push(StatisticsPage);
  }

  createNewGroup(){
    console.log("creando un nuevo grupo");
  }

  navEditGroup(grupo){
    console.log("editando el grupo -> " + grupo);
    //this.navCtrl.push(EditGroupPage);
  }

}
