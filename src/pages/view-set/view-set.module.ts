import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewSetPage } from './view-set';

@NgModule({
  declarations: [
    ViewSetPage,
  ],
  imports: [
    IonicPageModule.forChild(ViewSetPage),
  ],
})
export class ViewSetPageModule {}
