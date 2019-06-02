import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { SettingsPage } from '../settings/settings';
import { SearchPage } from '../search/search';
import { TradeListPage } from '../trade-list/trade-list';
import { TradeListService } from '../../services/tradeList.service'
import { SearchSetPage } from '../search-set/search-set';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = SearchPage;
  tab2Root = SearchSetPage;
  tab3Root = TradeListPage
  tab4Root = SettingsPage;
  tab5Root = AboutPage;

  constructor(public tradeServiceList: TradeListService) {

  }
}
