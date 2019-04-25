import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import {TransactionRq, TransactionRs, LoginRs} from '../_dtos/index';
import {InquiryRq} from '../dtos/inquiry';

//client url
let apiUrl = 'https://reponline.herokuapp.com/';
//transaction creation endpoint
let createTransactionUrl = 'api/v1/transaction';
//transaction info endpoint
let getTransactionInfoUrl= 'api/v1/transaction/';

let getTransactionGroupsInfoUrl= 'api/v1/transaction/groups/';

let getTransactionInvitationsInfoUrl= 'api/v1/transaction/invitations/';

let getTransactionInvitationsAcceptInfoUrl= 'api/v1/transaction/invitation/acceptOrNotInvitation/';

let getTransactionByDay= 'api/v1/transactions/ByDay/';

let getTransactionByWeek= 'api/v1/transactions/ByWeek/';

let getTransactionAcceptUrl= 'api/v1/transaction/accept/';

let getTransactionValorateUrl= 'api/v1/transaction/valorate/';

let getTransactionRetrieveAllUrl= 'api/v1/transactions/';



@Injectable()
export class TransactionService {

  constructor(public http: Http) {}

  create(transaction: TransactionRq) {
    return new Promise((resolve, reject) => {
        let loginRs: LoginRs = JSON.parse(localStorage.getItem('user'));
        let headers = new Headers();
        headers.append('x-access-token', loginRs.token);
        headers.append('x-key', loginRs.user.email);
        headers.append('Content-Type', 'application/json');

        this.http.post(apiUrl+createTransactionUrl, JSON.stringify(transaction), {headers: headers})
          .subscribe(res => {
            resolve(res.json());
          }, (err) => {
            reject(err);
          });
    });
  }

  sendInquiry(inquiry: InquiryRq){
    return new Promise((resolve, reject) => {
        let loginRs: LoginRs = JSON.parse(localStorage.getItem('user'));
        let headers = new Headers();
        headers.append('x-access-token', loginRs.token);
        headers.append('x-key', loginRs.user.email);
        headers.append('Content-Type', 'application/json');

        this.http.post(apiUrl+createTransactionUrl, JSON.stringify(inquiry), {headers: headers})
          .subscribe(res => {
            resolve(res.json());
          }, (err) => {
            console.log("salta por el error...");
            reject(err);
          });
    });
  }

  getInquiriesByDay(day){
    return new Promise((resolve, reject) => {
        let loginRs: LoginRs = JSON.parse(localStorage.getItem('user'));
        let headers = new Headers();
        headers.append('x-access-token', loginRs.token);
        headers.append('x-key', loginRs.user.email);
        headers.append('Content-Type', 'application/json');

        this.http.get(apiUrl + getTransactionByDay + day, {headers: headers})
          .subscribe(res => {
            resolve(res.json());
          }, (err) => {
            reject(err);
          });
    });
  }

  getGroups(){
    return new Promise((resolve, reject) => {
        let loginRs: LoginRs = JSON.parse(localStorage.getItem('user'));
        let headers = new Headers();
        headers.append('x-access-token', loginRs.token);
        headers.append('x-key', loginRs.user.email);
        headers.append('Content-Type', 'application/json');

        this.http.get(apiUrl + getTransactionGroupsInfoUrl + loginRs.user.email, {headers: headers})
          .subscribe(res => {
            resolve(res.json());
          }, (err) => {
            reject(err);
          });
    });
  }

  getInvitations(){
    return new Promise((resolve, reject) => {
        let loginRs: LoginRs = JSON.parse(localStorage.getItem('user'));
        let headers = new Headers();
        headers.append('x-access-token', loginRs.token);
        headers.append('x-key', loginRs.user.email);
        headers.append('Content-Type', 'application/json');

        this.http.get(apiUrl + getTransactionInvitationsInfoUrl, {headers: headers})
          .subscribe(res => {
            resolve(res.json());
          }, (err) => {
            reject(err);
          });
    });
  }

  acceptOrNotInvitation(inv){
    return new Promise((resolve, reject) => {
        let loginRs: LoginRs = JSON.parse(localStorage.getItem('user'));
        let headers = new Headers();
        headers.append('x-access-token', loginRs.token);
        headers.append('x-key', loginRs.user.email);
        headers.append('Content-Type', 'application/json');

        this.http.put(apiUrl + getTransactionInvitationsAcceptInfoUrl + inv._id, inv, {headers: headers})
          .subscribe(res => {
            resolve(res.json());
          }, (err) => {
            reject(err);
          });
    });
  }

  getInquiriesByWeek(week){
    return new Promise((resolve, reject) => {
        let loginRs: LoginRs = JSON.parse(localStorage.getItem('user'));
        let headers = new Headers();
        headers.append('x-access-token', loginRs.token);
        headers.append('x-key', loginRs.user.email);
        headers.append('Content-Type', 'application/json');

        this.http.get(apiUrl + getTransactionByWeek + week, {headers: headers})
          .subscribe(res => {
            resolve(res.json());
          }, (err) => {
            reject(err);
          });
    });
  }

  retrieve(transactionId: String) {
    return new Promise((resolve, reject) => {
        let loginRs: LoginRs = JSON.parse(localStorage.getItem('user'));
        let headers = new Headers();
        headers.append('x-access-token', loginRs.token);
        headers.append('x-key', loginRs.user.email);
        headers.append('Content-Type', 'application/json');

        this.http.get(apiUrl + getTransactionInfoUrl + transactionId, {headers: headers})
          .subscribe(res => {
            resolve(res.json());
          }, (err) => {
            reject(err);
          });
    });
  }

  retrieveAll(email: String) {
    return new Promise((resolve, reject) => {
        let loginRs: LoginRs = JSON.parse(localStorage.getItem('user'));
        let headers = new Headers();
        headers.append('x-access-token', loginRs.token);
        headers.append('x-key', loginRs.user.email);
        headers.append('Content-Type', 'application/json');

        this.http.get(apiUrl + getTransactionRetrieveAllUrl + email, {headers: headers})
          .subscribe(res => {
            resolve(res.json());
          }, (err) => {
            reject(err);
          });
    });
  }

  accept(transactionId: String) {
    return new Promise((resolve, reject) => {
        let loginRs: LoginRs = JSON.parse(localStorage.getItem('user'));
        let headers = new Headers();
        headers.append('x-access-token', loginRs.token);
        headers.append('x-key', loginRs.user.email);
        headers.append('Content-Type', 'application/json');

        this.http.put(apiUrl + getTransactionAcceptUrl + transactionId,'', {headers: headers})
          .subscribe(res => {
            resolve(res.json());
          }, (err) => {
            reject(err);
          });
    });
  }

  valorate(transactionId: String) {
    return new Promise((resolve, reject) => {
        let loginRs: LoginRs = JSON.parse(localStorage.getItem('user'));
        let headers = new Headers();
        headers.append('x-access-token', loginRs.token);
        headers.append('x-key', loginRs.user.email);
        headers.append('Content-Type', 'application/json');

        this.http.put(apiUrl + getTransactionValorateUrl + transactionId,'', {headers: headers})
          .subscribe(res => {
            resolve(res.json());
          }, (err) => {
            reject(err);
          });
    });
  }
}
