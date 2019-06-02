import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShowCardPage } from './show-card';

@NgModule({
  declarations: [
    ShowCardPage,
  ],
  imports: [
    IonicPageModule.forChild(ShowCardPage),
  ],
})
export class ShowCardPageModule {}
