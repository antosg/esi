import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { TransactionService} from '../../app/_services/index';
import { InquiriesByWeekRsp} from '../../app/dtos/inquiry';
import { IDetailedError } from '@ionic/cloud-angular';
import { NavController , AlertController } from 'ionic-angular';

import { Chart } from 'chart.js';

import {RegisterGroupStatsRs, RegisterGroupRs} from '../../app/_dtos/index';
import { commentDto } from '../../app/dtos/inquiry';

/**
 * Generated class for the StatisticsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
 selector: 'page-weekstats',
 templateUrl: 'weekstats.html',
})
export class WeekstatsPage {

  //@ViewChild('barCanvas') barCanvas: ElementRef;
  @ViewChild('doughnutCanvas1') doughnutCanvas1: ElementRef;
  @ViewChild('doughnutCanvas2') doughnutCanvas2: ElementRef;
  @ViewChild('doughnutCanvas3') doughnutCanvas3: ElementRef;
  @ViewChild('lineCanvas') lineCanvas: ElementRef;

  //barChart: any;
  doughnutChart1: any;
  doughnutChart2: any;
  doughnutChart3: any;
  lineChart: any;
  cc: string;
  num_cc: number;

  InquiriesByWeekRsp: InquiriesByWeekRsp = new InquiriesByWeekRsp();
  MyDatePicker : any;
  groupSelect : any;
  RegisterGroupStatsRs: RegisterGroupStatsRs = new RegisterGroupStatsRs();
  RegisterGroupRs: RegisterGroupRs = new RegisterGroupRs();
  groups: any = [];
  idGroup : any;
  commentDto : commentDto = new commentDto();

  constructor(public navCtrl: NavController,
    public transactionService: TransactionService,
    public alertCtrl: AlertController,
    public navParams: NavParams) {

      //console.log("item..." + navParams.get('item'));
      if (navParams.get('item') != null || navParams.get('item') != undefined){
        //console.log("navParms -> " + navParams.get('item'));
        //console.log("navParms -> " + navParams.get('item')._id);
        //console.log(navParams.get('item'));
        this.RegisterGroupStatsRs = navParams.get('item');
        //console.log("nombre grupo1 -> " + this.RegisterGroupStatsRs.group);
        this.idGroup = this.RegisterGroupStatsRs._id;
        this.groupSelect = this.RegisterGroupStatsRs._id;
      }else{
        //console.log("nombre grupo -> null");
        this.idGroup = "";
      }

  }

  ionViewWillEnter(){
    this.refreshGroupSelect();
  };

  refreshGroupSelect(){
    //console.log('ionViewDidLoad GroupsPage');
    this.transactionService.getGroups().then((registerResult) => {
        //console.log('ok getGroups');
        let registerData: any = registerResult;
        this.RegisterGroupRs = registerData;
        //console.log("Los grupos para las estadísticas son -> " + JSON.stringify(this.RegisterGroupRs));
        this.groups = this.RegisterGroupRs;
      }, (err:IDetailedError<string[]>) => {
          console.log(err);
      });

  }

  ionViewDidLoad() {

    var data1 = [];
    var data2 = [];
    var data3 = [];
    var days = [];
    var linea_q1 = [];
    var linea_q2 = [];
    var linea_q3 = [];
    var linea_aceptabilidad = [];
    var numInq = 0;

    //console.log("MyDatePicker -> " + this.MyDatePicker);
    var x = new Date();
    if (this.MyDatePicker != null){
      x = new Date(this.MyDatePicker);
    }else{
      let myDate: String = new Date().toISOString();
      this.MyDatePicker = myDate;
    }
    //console.log("fecha sobre la que calculamos -> " + x);

    var weeki = currentWeekNumber(x);
    //console.log("weeki -> " + weeki);

    if (this.groupSelect != "" && this.groupSelect != null){
      this.transactionService.getInquiriesByWeek(weeki, this.groupSelect).then((registerResult) => {
        //console.log('getting inquiriesByDay...');
        //console.log(registerResult);
        let InquiriesByWeekRsp: any = registerResult;
        this.InquiriesByWeekRsp = InquiriesByWeekRsp;

        if (InquiriesByWeekRsp == "undefined" || InquiriesByWeekRsp == undefined || InquiriesByWeekRsp == null){
          //console.log("noy hay ninguna encuesta...");
          data1 = [0, 0, 0, 0];
          data2 = [0, 0, 0, 0];
          data3 = [0, 0, 0, 0];
        }else{
          //console.log("acabo de cargar " + InquiriesByWeekRsp.num_inquiries + " encuestas....");
          numInq = InquiriesByWeekRsp.num_inquiries;
          data1 = this.InquiriesByWeekRsp.x100_res_q1;
          data2 = this.InquiriesByWeekRsp.x100_res_q2;
          data3 = this.InquiriesByWeekRsp.x100_res_q3;
          days = this.InquiriesByWeekRsp.day;
          var dd = [];
          for (var i = 0; i < days.length; i++) {
              dd.push(days[i].toString().substring(6) + '/' + days[i].toString().substring(4, 6));
          }
          linea_q1 = InquiriesByWeekRsp.line_q1;
          linea_q2 = InquiriesByWeekRsp.line_q2;
          linea_q3 = InquiriesByWeekRsp.line_q3;
          linea_aceptabilidad = InquiriesByWeekRsp.line_aceptabilidad;
          this.cc = "";
          this.num_cc = 0;

          for (var ii = 0; ii < this.InquiriesByWeekRsp.comments.length; ii++) {
            var arrC = this.InquiriesByWeekRsp.comments[ii];
            //console.log("coentario en < " + arrC.length);
            for (var k = 0; k < arrC.length; k++){
              this.commentDto = arrC[k];
              this.num_cc++;
              this.cc = this.cc + this.commentDto.comment + '\n';
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

        this.lineChart = new Chart(this.lineCanvas.nativeElement, {
            type: 'line',
            data: {
                //labels: ["January", "February", "March", "April", "May", "June", "July"],
                labels: dd,
                datasets: [
                    {
                        label: "^Question1",
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: "rgba(75,192,192,0.4)",
                        borderColor: "rgba(75,192,192,1)",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "rgba(75,192,192,1)",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(75,192,192,1)",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        //data: [65, 59, 80, 81, 56, 55, 40],
                        data: linea_q1,
                        spanGaps: false,
                    },
                    {
                        label: "^Question2",
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: "rgba(34, 139, 34, 0.4)",
                        borderColor: "rgba(34, 139, 34,1)",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "rgba(34, 139, 34,1)",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(34, 139, 34,1)",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        //data: [65, 59, 80, 81, 56, 55, 40],
                        data: linea_q2,
                        spanGaps: false,
                    },
                    {
                        label: "^Question3",
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: "rgba(255, 165, 0,0.4)",
                        borderColor: "rgba(255, 165, 0,1)",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "rgba(255, 165, 0,1)",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(255, 165, 0,1)",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        //data: [65, 59, 80, 81, 56, 55, 40],
                        data: linea_q3,
                        spanGaps: false,
                    },
                    {
                        label: "^Accept",
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: "rgba(255, 0, 0, 0.4)",
                        borderColor: "rgba(255, 0, 0,1)",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "rgba(255, 0, 0,1)",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(255, 0, 0,1)",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        //data: [65, 59, 80, 81, 56, 55, 40],
                        data: linea_aceptabilidad,
                        spanGaps: false,
                    }
                ]
            }

        });

        if (numInq == 0){
          let alert = this.alertCtrl.create({
            title:'^No hay encuestas por semana de mostrar todavía...',
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
            title:'^No hay encuestas por semana de mostrar todavía...',
            subTitle:errors,
            buttons:['OK']
          });
          alert.present();
        }else{
          let alert = this.alertCtrl.create({
            title:'^getting inquiry by week Error',
            subTitle:errors,
            buttons:['OK']
          });
          alert.present();
        }

      });
    }
  }

  doRefresh(refresher) {
    //console.log('Begin async operation', refresher);
                this.ionViewDidLoad();
    setTimeout(() => {
      //console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

}

function currentWeekNumber(date) {
  var instance;

  if (typeof date === 'string' && date.length) {
    instance = new Date(date);
  } else if (date instanceof Date) {
    instance = date;
  } else {
    instance = new Date();
  }

  // Create a copy of this date object
  var target = new Date(instance.valueOf());

  // ISO week date weeks start on monday
  // so correct the day number
  var dayNr = (instance.getDay() + 6) % 7;

  // ISO 8601 states that week 1 is the week
  // with the first thursday of that year.
  // Set the target date to the thursday in the target week
  target.setDate(target.getDate() - dayNr + 3);

  // Store the millisecond value of the target date
  var firstThursday = target.valueOf();

  // Set the target to the first thursday of the year
  // First set the target to january first
  target.setMonth(0, 1);
  // Not a thursday? Correct the date to the next thursday
  if (target.getDay() !== 4) {
    target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
  }

  // The weeknumber is the number of weeks between the
  // first thursday of the year and the thursday in the target week
  var weekNumber = 1 + Math.ceil((firstThursday - target.getTime()) / 604800000);
  return weekNumber;
};
