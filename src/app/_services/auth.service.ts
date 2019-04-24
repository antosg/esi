import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import {LoginRq, LoginRs, RegisterRq, RegisterRs, RegisterGroupRs, RegisterGroupRq, modifyUserRq, ResetRq, userPreferencesRq } from '../_dtos/index';

//client url
let apiUrl = 'https://reponline.herokuapp.com/';
//login endpoint
let loginUri = 'login';
//logout endpoint
let logoutUri = 'logout';
//register endpoint
let registerUri = 'user';
//recover user info endpointl
let userInfoUri = 'api/v1/user/';

let createGroupUrl = 'api/v1/transaction/groups/';

let userInfoPreferences = 'api/v1/user/preferences/'

let forgotUri = 'user/forgot';

let resetUri = 'reset/'

@Injectable()
export class AuthService {

  constructor(public http: Http) {}

  login(credentials: LoginRq) {
    return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        this.http.post(apiUrl+loginUri, JSON.stringify(credentials), {headers: headers})
          .subscribe(res => {
            resolve(res.json());
          }, (err) => {
            reject(err);
          });
    });
  }

  logout(){
    return new Promise((resolve, reject) => {
        let loginRs: LoginRs = JSON.parse(localStorage.getItem('user'));
        let headers = new Headers();
        headers.append('x-access-token', loginRs.token);
        headers.append('x-key', loginRs.user.email);

        this.http.post(apiUrl+logoutUri, {}, {headers: headers})
          .subscribe(res => {
            localStorage.setItem("token", null);
            localStorage.setItem("user", null);
            resolve(res.json());
          }, (err) => {
            reject(err);
          });
    });
  }

  register(data: RegisterRq) {
    return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        this.http.post(apiUrl+registerUri, JSON.stringify(data), {headers: headers})
          .subscribe(res => {
            resolve(res.json());
          }, (err) => {
            reject(err);
          });
    });
  }

  registerGroup(data: RegisterGroupRq) {
    return new Promise((resolve, reject) => {
        let loginRs: LoginRs = JSON.parse(localStorage.getItem('user'));
        let headers = new Headers();
        headers.append('x-access-token', loginRs.token);
        headers.append('x-key', loginRs.user.email);
        headers.append('Content-Type', 'application/json');

        this.http.post(apiUrl+createGroupUrl, JSON.stringify(data), {headers: headers})
          .subscribe(res => {
            resolve(res.json());
          }, (err) => {
            reject(err);
          });
    });
  }

  updateGroup(data: RegisterGroupRs) {
    return new Promise((resolve, reject) => {
        let loginRs: LoginRs = JSON.parse(localStorage.getItem('user'));
        let headers = new Headers();
        headers.append('x-access-token', loginRs.token);
        headers.append('x-key', loginRs.user.email);
        headers.append('Content-Type', 'application/json');

        this.http.put(apiUrl+createGroupUrl, JSON.stringify(data), {headers: headers})
          .subscribe(res => {
            resolve(res.json());
          }, (err) => {
            reject(err);
          });
    });
  }

  forgot(data: RegisterRq) {
    return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this.http.post(apiUrl+forgotUri, JSON.stringify(data), {headers: headers})
          .subscribe(res => {
            resolve(res.json());
          }, (err) => {
            reject(err);
          });
    });
  }

  reset(data: ResetRq, token: string) {
    return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this.http.post(apiUrl+resetUri+token, JSON.stringify(data), {headers: headers})
          .subscribe(res => {
            resolve(res.json());
          }, (err) => {
            reject(err);
          });
    });
  }

  recoverUserData() {
    return new Promise((resolve, reject) => {
        let loginRs: LoginRs = JSON.parse(localStorage.getItem('user'));
        let headers = new Headers();
        headers.append('x-access-token', loginRs.token);
        headers.append('x-key', loginRs.user.email);
        headers.append('Content-Type', 'application/json');

        this.http.get(apiUrl + userInfoUri + loginRs.user.email, {headers: headers})
          .subscribe(res => {
            resolve(res.json());
          }, (err) => {
            reject(err);
          });
    });
  }

  recoverUserPreferences() {
    return new Promise((resolve, reject) => {
        let loginRs: LoginRs = JSON.parse(localStorage.getItem('user'));
        let headers = new Headers();
        headers.append('x-access-token', loginRs.token);
        headers.append('x-key', loginRs.user.email);
        headers.append('Content-Type', 'application/json');

        this.http.get(apiUrl + userInfoPreferences + loginRs.user.email, {headers: headers})
          .subscribe(res => {
            resolve(res.json());
          }, (err) => {
            reject(err);
          });
    });
  }

  modifyUserData(data: modifyUserRq) {
    return new Promise((resolve, reject) => {
        let loginRs: LoginRs = JSON.parse(localStorage.getItem('user'));
        let headers = new Headers();
        headers.append('x-access-token', loginRs.token);
        headers.append('x-key', loginRs.user.email);
        headers.append('Content-Type', 'application/json');

        this.http.put(apiUrl + userInfoUri + loginRs.user.email, JSON.stringify(data), {headers: headers})
          .subscribe(res => {
            resolve(res.json());
          }, (err) => {
            reject(err);
          });
    });
  }

  modifyUserPreferences(data: userPreferencesRq) {
    return new Promise((resolve, reject) => {
        let loginRs: LoginRs = JSON.parse(localStorage.getItem('user'));
        let headers = new Headers();
        headers.append('x-access-token', loginRs.token);
        headers.append('x-key', loginRs.user.email);
        headers.append('Content-Type', 'application/json');

        this.http.put(apiUrl + userInfoPreferences + loginRs.user.email, JSON.stringify(data), {headers: headers})
          .subscribe(res => {
            resolve(res.json());
          }, (err) => {
            reject(err);
          });
    });
  }



}
