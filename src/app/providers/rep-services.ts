import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

const url: string = "https://reponline.herokuapp.com";
const login: string ="/login";
const retrieveUser: string ="/user/";
var dummyLoginObject: DummyLogin;
const dummyLogin: any = `{ "email": "villenita@gmail.com",
  "password": "villenita43"}`;

class DummyLogin {
    email: string;
    password: string;

    constructor(email: string, password: string){
        this.email = email;
        this.password = password;
    }
}

@Injectable()
export class RepServices {
    data:  any = null;

    constructor(public http: Http){}

    loginRep(email: string, password: string){
        dummyLoginObject = new DummyLogin(email, password)
        if (this.data){
            return Promise.resolve(this.data);
        }
        return new Promise(resolve => {
            this.http.post(url + login, dummyLoginObject)
            .map(res => res.json())
            .subscribe(data => {
                this.data = data;
                resolve(this.data);
            });
        });
    }

    retrieveUserRep(email: string){
        console.log("retrieveUserrep -> " + email);
        this.data = null;
        var dummyRetrieveObject = email;
        if (this.data != null){
          console.log("retrieveUserrep1");
            return Promise.resolve(this.data);
        }
        return new Promise(resolve => {
          console.log(url + " / " + retrieveUser + " / " + dummyRetrieveObject);
            this.http.get(url + retrieveUser + dummyRetrieveObject)
            .map(res => res.json())
            .subscribe(data => {
                this.data = data;
                resolve(this.data);
            });
        });
    }
}
