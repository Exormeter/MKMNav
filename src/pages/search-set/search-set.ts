import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestService } from '../../services/restService';
import { FormControl } from '@angular/forms';
import { ViewSetPage } from '../view-set/view-set';
import { ExpansionSet } from '../../models/mkmApiResults/expansion.model';

/**
 * Generated class for the SearchSetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search-set',
  templateUrl: 'search-set.html',
})
export class SearchSetPage {

  private filterWords: Array<string> = [
    "Promos",
    "Tokens",
    "WCD",
    "Products",
    "Filler Cards",
    "Starcity",
    "GnD",
    "Armada",
    "Ultra-Pro",
    "Pro Tour",
    "Alternate",
    "Misprints",
    "Multiverse",
    "Oversized",
    "Player",
    "Salvat-Hachette",
    "MKM",
    "Bordered",
    "Italian",
    "Summer",
    "Lands",
    "Japansese"
  ]
  searchControl: FormControl;

  private expansionList: Array<ExpansionSet> = new Array<ExpansionSet>();
  private filteredList: Array<ExpansionSet>
  constructor(public navCtrl: NavController, public navParams: NavParams, private restService: RestService) {
    this.searchControl = new FormControl();
  }

  ionViewDidLoad() {
    if(this.expansionList.length == 0){

      this.restService.getExpansions()
      .flatMap(expansion => expansion)
      .filter(expansion => !this.filterWords.some(function(filterWord){
        return expansion.enName.indexOf(filterWord) >= 0;
      }))
      .subscribe(
        expansion => {this.expansionList.push(expansion)},
        error => {throw error},
        () => {this.expansionList.reverse()}
      );
      
    }

    this.filteredList = this.expansionList;
    this.searchControl.valueChanges.debounceTime(100).subscribe(searchTerm =>{
      this.filteredList = this.expansionList.filter(expansion => expansion.enName.indexOf(searchTerm) >= 0);
    })
    
  }

  expansionSelected(expansion: ExpansionSet){
    this.navCtrl.push(ViewSetPage, {'expansion': expansion})
  }

}
