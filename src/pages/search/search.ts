import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RestService } from '../../services/restService';
import { SearchAutocompleteService } from '../../services/searchAutocompleteService';
import { ShowCardPage } from '../show-card/show-card';
import { SettingsService } from '../../services/settings.service';
import { AutoCompleteComponent } from 'ionic2-auto-complete';
import { ScryfallCardResult } from '../../models/scryfallResults/scryfallCardResult.model';
import { ButtonListComponent } from '../../components/button-list/button-list';  

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {
  @ViewChild(AutoCompleteComponent)
  searchbar: AutoCompleteComponent;

  @ViewChild(ButtonListComponent)
  buttonList: ButtonListComponent

  private cardVersions:Array<ScryfallCardResult> = new Array<ScryfallCardResult>();

  constructor(private settingsService: SettingsService, public searchAutocompleteService: SearchAutocompleteService, 
              public navCtrl: NavController, private restService: RestService, public searchService: SettingsService) {

  }

  ionViewWillEnter(){
    this.cardVersions = [];
  }


  chooseCard(item){
    this.cardVersions = [];
    this.restService.getCardByNameScryfall(item.searchName).
    flatMap(single => single).subscribe(result =>{
      result.foreign_name = item.name;
      this.cardVersions.push(result);
    });
  }

  itemSelected(card: ScryfallCardResult){
    this.settingsService.setCurrentSettings();
    this.navCtrl.push(ShowCardPage, {'card': card});
  }

  onFocusSearchbar(event){
      this.searchbar.clearValue();
      this.cardVersions = [];
  }

  setLanguage(){
    this.cardVersions = [];
  }

}
