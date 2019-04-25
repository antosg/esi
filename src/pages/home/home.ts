import { Component, ViewChild, ElementRef} from '@angular/core';
import { NavController , AlertController, LoadingController, ToastController, MenuController} from 'ionic-angular';
import { TaskListPage } from '../tasklist/tasklist';
import { LoginPage } from '../../app/_login';
import { SearchUserPage } from '../searchuser/searchuser';
import {TransactionCreatePage} from '../transaction/transactionCreate';
import {TransactionInfoPage} from '../transaction/transactionInfo';
import {TransactionAcceptPage} from '../transaction/transactionAccept';
import {TransactionValoratePage} from '../transaction/transactionValorate';
import {TransactionGetAllPage} from '../transaction/transactionGetAll';
import { RepServices } from '../../app/providers/rep-services';
import { StatisticsPage } from '../../pages/statistics/statistics';
import {TransactionService} from '../../app/_services/index';
import { UserDetails, IDetailedError } from '@ionic/cloud-angular';
import { Http } from '@angular/http';

import {LoginRs, UserLoginDto, LoginRq, TransactionRs} from '../../app/_dtos/index';
import {AuthService} from '../../app/_services/index';
import {MapperDto} from '../../app/_mapper/index';
import {UserInfoDto} from '../../app/dtos/userinfo';
import {UserInfoMapper} from '../../app/mapper/userinfomapper';
import {InquiryRq} from '../../app/dtos/inquiry';

import { Headers } from '@angular/http';
import { Events } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [RepServices, UserInfoMapper]
})
export class HomePage {

  userInfo: UserInfoDto = new UserInfoDto;
  InquiryRq: InquiryRq = new InquiryRq();
  transactionRs: TransactionRs = new TransactionRs();
  send_inquiry = false;
  myGroups: any;

//  @ViewChild('barCanvas') barCanvas;
//@ViewChild('doughnutCanvas') doughnutCanvas;
//@ViewChild('lineCanvas') lineCanvas;
@ViewChild('barCanvas') barCanvas: ElementRef;
@ViewChild('doughnutCanvas') doughnutCanvas: ElementRef;
@ViewChild('lineCanvas') lineCanvas: ElementRef;

barChart: any;
doughnutChart: any;
lineChart: any;

  constructor(public navCtrl: NavController,
    public alertCtrl: AlertController,
    public loadingCtrl:LoadingController,
    private toastCtrl: ToastController,
    public menu: MenuController,
    public transactionService: TransactionService,
    public repServices: RepServices,
    public events: Events,
    public authService: AuthService,
    public mapper: MapperDto,
    public http: Http) {

      var today = new Date();
      var last_inquiry = new Date(Number(localStorage.getItem('lastInquirySent')));
      var tomorrow = new Date();
      tomorrow.setDate(today.getDate()+1);
      tomorrow.setHours(0);
      tomorrow.setMinutes(0);
      tomorrow.setSeconds(0);

      if (last_inquiry == null){
        console.log("no hay encuesta grabada por lo que podemos grabar una encuesta...")
        this.send_inquiry = true;
      }else{
        console.log("hay una encuesta grabada -> " + last_inquiry);
        if (this.sameDay(today, last_inquiry)){
          console.log("hoy es el mismo día que la encuesta. NO podemos grabar otra....");
          this.send_inquiry = false;
        }else{
          console.log("hoy NO es el mismo día que la encuesta. podemos grabar otra....");
          this.send_inquiry = true;
        }
      }
      console.log("puedo enviar una encuesta? " +   this.send_inquiry);

      //para pruebas hago que se puedan enviar varias encuestas....
      this.send_inquiry = true;

      let loginRs: LoginRs = JSON.parse(localStorage.getItem('user'));
      this.repServices.retrieveUserRep(loginRs.user.email).then(data => {
        console.log(data);
        this.userInfo = data; //this.userInfoMapper.data2UserInfo(data);
        console.log(this.userInfo);
        return data;
      });

      //avisamos de que el usuario se ha logeado para cambiar la imagen también en el menú...
      this.events.publish('user:logged');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  ionViewWillEnter(){
    this.refreshGroupSelect();
  };

  refreshGroupSelect(){
    let loginRs: LoginRs = JSON.parse(localStorage.getItem('user'));
    let headers = new Headers();
    headers.append('x-access-token', loginRs.token);
    headers.append('x-key', loginRs.user.email);
    headers.append('Content-Type', 'application/json');

    this.http.get('https://reponline.herokuapp.com/masters/myGroups/' + loginRs.user.email, {headers: headers})
      .subscribe(res => {
        //resolve(res.json());
        console.log("mi respuesta es -> " + res.json());
        this.myGroups = res.json();
      }, (err) => {
        console.error(err);
      });

  }

  navToTasks(){
    this.navCtrl.push(TaskListPage);
  }

  navToSearch(){
    this.navCtrl.push(SearchUserPage);
  }

  navToCreateTransaction(){
    this.navCtrl.push(TransactionCreatePage);
  }

  navToGetTransactionInfo(){
    this.navCtrl.push(TransactionInfoPage);
  }

  navToGetTransactionAccept(){
    this.navCtrl.push(TransactionAcceptPage);
  }

  navToGetTransactionValoration(){
    this.navCtrl.push(TransactionValoratePage);
  }

  navToGetTransactionGetAll(){
    this.navCtrl.push(TransactionGetAllPage);
  }

  sameDay(d1, d2) {
    return d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate();
  }

  sendInquiry(){
    var now = new Date();
    console.log("He enviado la encuesta -> " + now.getTime());
    now.setHours(23);
    now.setMinutes(59);
    now.setSeconds(59);
    localStorage.setItem('lastInquirySent', now.getTime().toString());

    console.log(this.InquiryRq.question1);
    console.log(this.InquiryRq.question2);
    console.log(this.InquiryRq.question3);
    console.log(this.InquiryRq.observations);
    console.log(this.InquiryRq.group);


    if (
        (this.InquiryRq.question1 == undefined) ||
        (this.InquiryRq.question2 == undefined) ||
        (this.InquiryRq.question3 == undefined) ||
        (this.InquiryRq.group == undefined) ||
        (this.InquiryRq.question1 == 0) ||
        (this.InquiryRq.question2 == 0) ||
        (this.InquiryRq.question3 == 0)
    ){
      let alert = this.alertCtrl.create({
        title:'^Send inquiry error',
        subTitle:'^All fields are required',
        buttons:['OK']
      });
      alert.present();
      return;
    }

    let loader = this.loadingCtrl.create({
      content: "^Sending inquiry..."
    });
    loader.present();


    this.transactionService.sendInquiry(this.InquiryRq).then((registerResult) => {
      console.log('ok sending inqury...');
      loader.dismiss();
      console.log(registerResult);
      let registerData: any = registerResult;
      this.transactionRs = registerData;
      let alert = this.alertCtrl.create({
        title:'^Thanks for your help...',
        subTitle:"^recuerda que no podrás enviar otra encuesta para el mismo grupo hasta mañana!!",
        buttons:['OK']
      });
      alert.present();
      //this.send_inquiry = false;
      this.disabledForm();
    }, (err:IDetailedError<string[]>) => {
      console.log("si salta por el error aquí debería ver algo..." + err.toString());
      loader.dismissAll();
      let errors = '';
      let e = "";
      //for(let e of err.details) {
        //console.log("message -" + err.error);
        if(e === 'required_userOrigin') errors += 'User from is required.<br/>';
        if(e === 'required_UserEnd') errors += 'User to is required.<br/>';
        if(e === 'requires_description') errors += 'You need to feed transaction descriptiondesription.<br/>';
        //don't need to worry about conflict_username
        if(e === 'invalid_email') errors += 'Your email address isn\'t valid.';
        if(e === 'inquiry_exists') errors += 'Your email address isn\'t valid.';
      //}
      let alert = this.alertCtrl.create({
        title:'^Sending inquiry Error',
        subTitle:errors,
        buttons:['OK']
      });
      alert.present();
      this.disabledForm();
    });

  }

  disabledForm(){
    this.InquiryRq.question1 = 0;
    this.InquiryRq.question2 = 0;
    this.InquiryRq.question3 = 0;
    this.InquiryRq.observations = "";
    this.InquiryRq.group = "";
  }

}
