import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { TranslateService } from '@ngx-translate/core';

/**
 * Generated class for the TermsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-terms',
  templateUrl: 'terms.html',
})
export class TermsPage {

    terms: any;
    dLang: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, translate: TranslateService) {
    this.dLang = translate.getDefaultLang();
    //console.log("idioma por defecto -> " + this.dLang);
    this.http.get('https://reponline.herokuapp.com/masters/termsandcoditions/' + this.dLang).map(res => res.json()).subscribe(data => {
        this.terms = data.p0
        + "\n\n" + data.p01+ "\n\n" + data.p001 + "\n\n" + data.p002 + "\n\n" + data.p003 + "\n\n" + data.p004
        + "\n\n" + data.p2 + "\n\n" + data.p21 + "\n\n" + data.p22 + "\n\n" + data.p23
        + "\n\n" + data.p3 + "\n\n" + data.p31 + "\n\n" + data.p32 + "\n\n" + data.p33+ "\n\n" + data.p34
        + "\n\n" + data.p35 + "\n\n" + data.p36+ "\n\n" + data.p37
        + "\n\n" + data.p4 + "\n\n" + data.p41 + "\n\n" + data.p42 + "\n\n" + data.p43
        + "\n\n" + data.p5 + "\n\n" + data.p51
        + "\n\n" + data.p6 + "\n\n" + data.p61 + "\n\n" + data.p62
        + "\n\n" + data.p7 + "\n\n" + data.p71 + "\n\n" + data.p72
        + "\n\n" + data.p8 + "\n\n" + data.p81 + "\n\n" + data.p82
        + "\n\n" + data.p9 + "\n\n" + data.p91 + "\n\n" + data.p92 + "\n\n" + data.p93 + "\n\n" + data.p94
        + "\n\n" + data.p10 + "\n\n" + data.p101 + "\n\n" + data.p102 + "\n\n" + data.p103
        + "\n\n" + data.p11 + "\n\n" + data.p111
        + "\n\n" + data.p12 + "\n\n" + data.p121 + "\n\n" + data.p122
        + "\n\n" + data.p13 + "\n\n" + data.p131 + "\n\n" + data.p132 + "\n\n" + data.p133 + "\n\n" + data.p134
        + "\n\n" + data.p135 + "\n\n" + data.p136
        + "\n\n" + data.p14 + "\n\n" + data.p141 + "\n\n" + data.p142 + "\n\n" + data.p143 + "\n\n" + data.p144;

        //console.log("terms -> " + this.terms);
    })


  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad TermsPage');
  }

}
