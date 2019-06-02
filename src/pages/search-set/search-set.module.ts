import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchSetPage } from './search-set';

@NgModule({
  declarations: [
    SearchSetPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchSetPage),
  ],
})
export class SearchSetPageModule {}
