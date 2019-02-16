import { Injectable } from '@angular/core';
import { UserInfoDto } from '../dtos/userinfo';

@Injectable()
export class UserInfoMapper {
    data2UserInfo(data: any){
        let userInfo: UserInfoDto = new UserInfoDto();
        userInfo.uid = data.uid;
        userInfo.email = data.email;
        userInfo.name = data.name;
        userInfo.surname = data.surname;
        userInfo.generalReputationAvg = data.generalReputationAvg;
        userInfo.totalReputations = data.totalReputations;
        userInfo.totalCallPending = data.totalCallPending; 
        return userInfo;
    }
}