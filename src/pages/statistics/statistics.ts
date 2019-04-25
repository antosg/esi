import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import {TransactionService} from '../../app/_services/index';
import {InquiriesByDayRsp} from '../../app/dtos/inquiry';
import { UserDetails, IDetailedError } from '@ionic/cloud-angular';
import { NavController , AlertController, LoadingController, ToastController, MenuController} from 'ionic-angular';

import { WeekstatsPage } from '../../pages/weekstats/weekstats';
import {RegisterGroupRs, LoginRs} from '../../app/_dtos/index';

import { Chart } from 'chart.js';

/**
 * Generated class for the StatisticsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-statistics',
  templateUrl: 'statistics.html',
})
export class StatisticsPage {

  //@ViewChild('barCanvas') barCanvas: ElementRef;
  @ViewChild('doughnutCanvas1') doughnutCanvas1: ElementRef;
  @ViewChild('doughnutCanvas2') doughnutCanvas2: ElementRef;
  @ViewChild('doughnutCanvas3') doughnutCanvas3: ElementRef;
  //@ViewChild('lineCanvas') lineCanvas: ElementRef;

  //barChart: any;
  doughnutChart1: any;
  doughnutChart2: any;
  doughnutChart3: any;
  //lineChart: any;
  cc: string;
  num_cc: number;

  InquiriesByDayRsp: InquiriesByDayRsp = new InquiriesByDayRsp();
  MyDatePicker : any;
  RegisterGroupRs: RegisterGroupRs = new RegisterGroupRs();
  isGroup : any;

  constructor(public navCtrl: NavController,
    public transactionService: TransactionService,
    public alertCtrl: AlertController,
    public navParams: NavParams) {

      console.log("item..." + navParams.get('item'));
      if (navParams.get('item') != null || navParams.get('item') != undefined){
        console.log(navParams.get('item'));
        this.RegisterGroupRs = navParams.get('item');
        console.log("nombre grupo -> " + this.RegisterGroupRs.group);
        this.isGroup = true;
      }else{
        console.log("nombre grupo -> null");
        this.isGroup = false;
      }

  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
                this.ionViewDidLoad();
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  ionViewDidLoad() {

    console.log("MyDatePicker -> " + this.MyDatePicker);
    var x = new Date();
    if (this.MyDatePicker != null){
      x = new Date(this.MyDatePicker);
    }
    console.log("fecha sobre la que calculamos -> " + x);
    var now_utc =  Date.UTC(x.getUTCFullYear(), x.getUTCMonth(), x.getUTCDate(), x.getUTCHours(), x.getUTCMinutes(), x.getUTCSeconds());
    var j = new Date(now_utc);
    console.log("fecha sobre la que calculamos2 -> " + j);
    var y = j.getFullYear().toString();
    var m = (j.getMonth() + 1).toString();
    var d = j.getDate().toString();
    (d.length == 1) && (d = '0' + d);
    (m.length == 1) && (m = '0' + m);
    var yyyymmdd = y + m + d;
    var dayN = Number(yyyymmdd);
    console.log("dayN -> " + dayN);

    var data1 = [];
    var data2 = [];
    var data3 = [];
    var numInq = 0;

    this.transactionService.getInquiriesByDay(dayN).then((registerResult) => {
      console.log('getting inquiriesByDay...');
      console.log(registerResult);
      let InquiriesByDayRsp: any = registerResult;
      this.InquiriesByDayRsp = InquiriesByDayRsp;

      if (InquiriesByDayRsp == "undefined" || InquiriesByDayRsp == undefined || InquiriesByDayRsp == null){
        console.log("noy hay ninguna encuesta...");
        data1 = [0, 0, 0, 0];
        data2 = [0, 0, 0, 0];
        data3 = [0, 0, 0, 0];
      }else{
        console.log("acabo de cargar " + InquiriesByDayRsp.num_inquiries + " encuestas....");
        numInq = InquiriesByDayRsp.num_inquiries;
        data1 = this.InquiriesByDayRsp.x100_res_q1;
        data2 = this.InquiriesByDayRsp.x100_res_q2;
        data3 = this.InquiriesByDayRsp.x100_res_q3;
        this.cc = "";
        this.num_cc = 0;
        for (var i = 0; i < this.InquiriesByDayRsp.comments.length; i++) {
          console.log("comentario -> " + this.InquiriesByDayRsp.comments[i]);
          var arrRetCarro = this.InquiriesByDayRsp.comments[i].split("\n")
          for (var j = 0; j < arrRetCarro.length; j++) {
            this.num_cc++;
            this.cc = this.cc + arrRetCarro[j] + '\n';
            this.cc = this.cc + "············· \n";
          }
        }
      }

      this.doughnutChart1 = new Chart(this.doughnutCanvas1.nativeElement, {

          type: 'doughnut',
          data: {
              labels: ["^Muy bien", "^Bien", "^Regular", "^Mal"],
              datasets: [{
                  label: '# # ^de votos',
                  //data: [12, 19, 3, 5],
                  data: data1,
                  backgroundColor: [
                    'rgba(34, 139, 34, 0.5)',
                    'rgba(144, 238, 144, 0.5)',
                    'rgba(255, 165, 0, 0.5)',
                    'rgba(255, 0, 0, 0.5)'
                  ],
                  hoverBackgroundColor: [
                      "#228B22",
                      "#90EE90",
                      "#FFA500",
                      "#FF0000"
                  ]
              }]
          }

      });

      this.doughnutChart2 = new Chart(this.doughnutCanvas2.nativeElement, {

          type: 'doughnut',
          data: {
              labels: ["^Muy bien", "^Bien", "^Regular", "^Mal"],
              datasets: [{
                  label: '# ^de votos',
                  //data: [12, 19, 3, 5],
                  data: data2,
                  backgroundColor: [
                    'rgba(34, 139, 34, 0.5)',
                    'rgba(144, 238, 144, 0.5)',
                    'rgba(255, 165, 0, 0.5)',
                    'rgba(255, 0, 0, 0.5)'
                  ],
                  hoverBackgroundColor: [
                    "#228B22",
                    "#90EE90",
                    "#FFA500",
                    "#FF0000"
                  ]
              }]
          }

      });

      this.doughnutChart3 = new Chart(this.doughnutCanvas3.nativeElement, {

          type: 'doughnut',
          data: {
              labels: ["^Mucho", "^Normal", "^Poco", "^Nada"],
              datasets: [{
                  label: '# ^de votos',
                  //data: [12, 19, 3, 5],
                  data: data3,
                  backgroundColor: [
                    'rgba(34, 139, 34, 0.5)',
                    'rgba(144, 238, 144, 0.5)',
                    'rgba(255, 165, 0, 0.5)',
                    'rgba(255, 0, 0, 0.5)'
                  ],
                  hoverBackgroundColor: [
                    "#228B22",
                    "#90EE90",
                    "#FFA500",
                    "#FF0000"
                  ]
              }]
          }

      });

/*
      var data = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [{
            label: "Stock A",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(225,0,0,0.4)",
            borderColor: "red", // The main line color
            borderCapStyle: 'square',
            borderDash: [], // try [5, 15] for instance
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "black",
            pointBackgroundColor: "white",
            pointBorderWidth: 1,
            pointHoverRadius: 8,
            pointHoverBackgroundColor: "yellow",
            pointHoverBorderColor: "brown",
            pointHoverBorderWidth: 2,
            pointRadius: 4,
            pointHitRadius: 10,
            // notice the gap in the data and the spanGaps: true
            data: [65, 59, 80, 81, 56, 55, 40, ,60,55,30,78],
            spanGaps: true,
          }, {
            label: "Stock B",
            fill: true,
            lineTension: 0.1,
            backgroundColor: "rgba(167,105,0,0.4)",
            borderColor: "rgb(167, 105, 0)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "white",
            pointBackgroundColor: "black",
            pointBorderWidth: 1,
            pointHoverRadius: 8,
            pointHoverBackgroundColor: "brown",
            pointHoverBorderColor: "yellow",
            pointHoverBorderWidth: 2,
            pointRadius: 4,
            pointHitRadius: 10,
            // notice the gap in the data and the spanGaps: false
            data: [10, 20, 60, 95, 64, 78, 90,,70,40,70,89],
            spanGaps: false,
          }

        ]
      };
*/
      if (numInq == 0){
        let alert = this.alertCtrl.create({
          title:'^No hay encuestas por día de mostrar todavía...',
          subTitle:null,
          buttons:['OK']
        });
        alert.present();
      }

    }, (err:IDetailedError<string[]>) => {
      let errors = '';
      if (err.details != null){
        for(let e of err.details) {
          console.log(e);
          if(e === 'required_userOrigin') errors += 'User from is required.<br/>';
          if(e === 'required_UserEnd') errors += 'User to is required.<br/>';
          if(e === 'requires_description') errors += 'You need to feed transaction descriptiondesription.<br/>';
          //don't need to worry about conflict_username
          if(e === 'invalid_email') errors += 'Your email address isn\'t valid.';
        }
      }
      if (numInq == 0){
        let alert = this.alertCtrl.create({
          title:'^No hay encuestas por día de mostrar todavía...',
          subTitle:errors,
          buttons:['OK']
        });
        alert.present();
      }else{
        let alert = this.alertCtrl.create({
          title:'^getting inquiry by day Error',
          subTitle:errors,
          buttons:['OK']
        });
        alert.present();
      }

    });

  }

  weekStats(){
    console.log('affsdfasfadfadfafs.....');
    this.navCtrl.push(WeekstatsPage);
  }

}
