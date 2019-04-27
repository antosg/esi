import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { RepServices } from '../../app/providers/rep-services';
import {UserInfoDto} from '../../app/dtos/userinfo';
import {UserInfoMapper} from '../../app/mapper/userinfomapper';

@Component({
  selector: 'page-searchuser',
  templateUrl: 'searchuser.html',
  providers: [RepServices, UserInfoMapper]
})
export class SearchUserPage {
  userInfo: UserInfoDto;
  isHiddenUserCard: boolean = false;

  email = "";

  constructor(public navCtrl: NavController,
              public repServices: RepServices,
              public loadingCtrl: LoadingController,
              public userInfoMapper: UserInfoMapper) {
  }

  retrieveUser(){
    //console.log("dentro de retireveUser -> " + this.email);
    this.isHiddenUserCard = false;
    this.email = this.email;
    let loader = this.loadingCtrl.create({
      content: "Searching user..."
    })
    loader.present();
    this.repServices.retrieveUserRep(this.email).then(data => {
      loader.dismiss();
      //console.log(data);
      this.userInfo = data; //this.userInfoMapper.data2UserInfo(data);
      //console.log(this.userInfo);
      //this.isHiddenUserCard = !this.isHiddenUserCard;
      this.isHiddenUserCard = true;
      return data;
    });
  }

}
