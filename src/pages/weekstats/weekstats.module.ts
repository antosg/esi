import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WeekstatsPage } from './weekstats';

@NgModule({
  declarations: [
    WeekstatsPage,
  ],
  imports: [
    IonicPageModule.forChild(WeekstatsPage),
  ],
  exports: [
    WeekstatsPage
  ]
})
export class WeekstatsPageModule {}
