import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StatsaccessPage } from './statsaccess';

@NgModule({
  declarations: [
    StatsaccessPage,
  ],
  imports: [
    IonicPageModule.forChild(StatsaccessPage),
  ],
  exports: [
    StatsaccessPage
  ]
})
export class StatsaccessPageModule {}
