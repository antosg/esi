import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditGroupPage } from './edit-group';

@NgModule({
  declarations: [
    EditGroupPage,
  ],
  imports: [
    IonicPageModule.forChild(EditGroupPage),
  ],
  exports: [
    EditGroupPage
  ]
})
export class EditGroupPageModule {}
