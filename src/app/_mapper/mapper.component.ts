import { Injectable } from '@angular/core';
import { UserLoginDto, LoginRs, RegisterRq, LoginRq } from '../_dtos/index';

@Injectable()
export class MapperDto {
    data2UserInfo(data: any){
        let userLoginDto: UserLoginDto = new UserLoginDto();
        userLoginDto.uid = data.uid;
        userLoginDto.email = data.email;
        userLoginDto.name = data.name;
        userLoginDto.surname = data.surname;
        let loginRs: LoginRs = new LoginRs();
        loginRs.token = data.token;
        loginRs.expires = data.expires;
        return loginRs;
    }

    registerRqToLoginRq(register: RegisterRq) {
        var loginRq: LoginRq = new LoginRq();
        loginRq.email = register.email;
        loginRq.password = register.password;
        return loginRq; 
    }
}