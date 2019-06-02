import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TradeListPage } from './trade-list';

@NgModule({
  declarations: [
    TradeListPage,
  ],
  imports: [
    IonicPageModule.forChild(TradeListPage),
  ],
})
export class TradeListPageModule {}
