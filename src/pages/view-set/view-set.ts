import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading, Content, VirtualScroll } from 'ionic-angular';
import { RestService } from '../../services/restService';
import { Product } from '../../models/mkmApiResults/product.model';
import { ExpansionSet } from '../../models/mkmApiResults/expansion.model';
import { NumberFormatter } from '../../services/numberFormatter.service';
import { ShowCardPage } from '../show-card/show-card';
import { SettingsService } from '../../services/settings.service';
import * as FuzzySet from 'fuzzyset.js';
import { ScryfallCardResult } from '../../models/scryfallResults/scryfallCardResult.model';
import { Img } from 'ionic-angular/umd/components/img/img-interface';
import { updateImgs } from 'ionic-angular/components/content/content';
import { ListViewSettings } from '../../services/listViewSettings.service';
import { SearchSetPage } from '../search-set/search-set';


/**s]
 * Generated class for the ViewSetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-set',
  templateUrl: 'view-set.html',
})
export class ViewSetPage {
  @ViewChild(Content) _content: Content;
  @ViewChild('pageTop') pageTop: Content;
  @ViewChild('virtualScroll', { read: VirtualScroll }) virtualScroll: VirtualScroll;

  private singleList: Array<Product> = new Array<Product>();
  private singleListSorted: Array<Product> = new Array<Product>();
  private singleListSortedGallery: Array<Product> = new Array<Product>();
  private expansion: ExpansionSet; 
  private loading: Loading;
  

  constructor(private listViewSettings: ListViewSettings, public settingsService: SettingsService, public navCtrl: NavController, public navParams: NavParams, private restService: RestService, private loadingCtrl: LoadingController, public numberformatter: NumberFormatter) {
    this.listViewSettings.setPageController(this);
  }

  ionViewDidLoad() {
    this.presentLoadingDefault();
  }

  ionViewWillEnter(){
    
    
    if(this.expansion == undefined || this.expansion.idExpansion != this.navParams.get('expansion').idExpansion){
      this.expansion = this.navParams.get('expansion');
      this.loadSingles();
    }
  }

  ionViewDidEnter(){
    if(this.navCtrl.getPrevious().instance instanceof SearchSetPage){
      this.listViewSettings.changeToListView();
    }
  }


  sanitizeRarity(single: Product){
    if(single.rarity == "Time Shifted"){
      return "timeshifted";
    }
    else if(single.rarity.indexOf(" ") > 0){
      return "void";
    }
    return single.rarity.toLocaleLowerCase();
  }

  presentLoadingDefault() {
    this.loading = this.loadingCtrl.create({
      content: 'Loading Card Prices...'
    });
    this.loading.present();
  }

  singleSelected(single: Product){
    this.restService.getCardByNameScryfall(single.enName)
    .subscribe(scryFallResultList => {
      let scryFallResult = this.matchCardmarketToScryfall(single, scryFallResultList);
      this.settingsService.setCurrentSettings();
      this.navCtrl.push(ShowCardPage, {'card': scryFallResult})
    });
  }

  loadSingles(){
    this.restService.getAllSinglesInExpansion(this.expansion.idExpansion)
      .flatMap(single => single)
      .mergeMap(single => this.restService.getProductsById(single.idProduct))
      .map(single => {
        single.image = "https://www.cardmarket.com"+ single.image.substring(1);
        return single;
      })
      .subscribe(
      single => {
        this.singleList.push(single)},
      error => {throw error},
      () => {
        this.sortList();
        this.singleListSorted = this.singleList;
        this.singleListSortedGallery = [this.singleListSorted[0]];
        this.loading.dismiss();
      }
    );
  }

  matchCardmarketToScryfall(single: Product, scryFallResultList: ScryfallCardResult[]): ScryfallCardResult{

    let scryFallResult: ScryfallCardResult;

    switch(single.expansion.enName){

      case "Alpha":
        single.expansion.enName = "Limited Edition Alpha";
        break;

      case "Beta":
        single.expansion.enName = "Limited Edition Beta";
        break;
    }

    let setVersions: Map<string, ScryfallCardResult> = new Map<string, ScryfallCardResult>() ;
      scryFallResultList.forEach((scryFallResult: ScryfallCardResult)=>{
        setVersions.set(scryFallResult.set_name, scryFallResult);
      });
      if(setVersions.has(single.expansion.enName)){
        scryFallResult = setVersions.get(single.expansion.enName);
      }
      else{
        let setNames = Array.from( setVersions.keys());
        let fuzzyset = FuzzySet(setNames);
        let fuzzyResult = fuzzyset.get(single.expansion.enName);
        if(fuzzyResult != undefined){
          let setName = fuzzyResult[0][1];
          scryFallResult = setVersions.get(setName);
        }
        
      }

      return scryFallResult;
  }

  prepareGalleryView(): Promise<any>{
    this.singleListSortedGallery = [this.singleListSorted[0]];
    return this.pageTop.scrollToTop().then(()=>{
      this.singleListSortedGallery = this.singleListSorted;
      this.virtualScroll.readUpdate(true);
      this.virtualScroll.writeUpdate(true);
    });
  }

  prepareListView(){
    if(this.singleListSorted.length > 0){
      this.singleListSortedGallery = [this.singleListSorted[0]];
    }
  }

  sortList(){
    if(this.listViewSettings.$sortedByAlphabet){
      this.sortByAlphabet();
    }
    else if(this.listViewSettings.$sortedByPrice){
      this.sortByPrice();
    }
    else if(this.listViewSettings.$sortedByRarity){
      this.sortByRarity();
    }
  }

  sortByPrice(){
    let sortFunction: any;
    switch(this.listViewSettings.$listOrder){

      case "Ascending":
      sortFunction = function(singleA: Product, singleB: Product){
        if(singleA.priceGuide.LOW < singleB.priceGuide.LOW){
          return -1;
        }
        else if(singleA.priceGuide.LOW > singleB.priceGuide.LOW){
          return 1;
        }
        return 0;
      }
        break;

      case "Descending":
        sortFunction = function(singleA: Product, singleB: Product){
          if(singleA.priceGuide.LOW > singleB.priceGuide.LOW){
            return -1;
          }
          else if(singleA.priceGuide.LOW < singleB.priceGuide.LOW){
            return 1;
          }
          return 0;
        }
        break;

    }
    this.singleList.sort(sortFunction);
  }

  sortByAlphabet(){
    let sortFunction: any;
    switch(this.listViewSettings.$listOrder){

      case "Ascending":
        sortFunction = function(singleA: Product, singleB: Product){
          if(singleA.enName < singleB.enName){
            return -1;
          }
          else if(singleA.enName > singleB.enName){
            return 1;
          }
          return 0;
        }
        break;

      case "Descending":
      sortFunction = function(singleA: Product, singleB: Product){
        if(singleA.enName > singleB.enName){
          return -1;
        }
        else if(singleA.enName < singleB.enName){
          return 1;
        }
        return 0;
      }
      break;
    }
    this.singleList.sort(sortFunction);
  }

  sortByRarity(){
    let sortFunction: any;
    let rarityMap: Map<string, number> = new Map<string, number>([
      ["Time Shifted", 0],
      ["Mythic", 1],
      ["Rare", 2],
      ["Uncommon", 3],
      ["Common", 4],
      ["Land", 5],
      ["Token", 6],
      ["Tip Card", 7]
    ])
    switch(this.listViewSettings.$listOrder){

      case "Ascending":
        sortFunction = function(singleA: Product, singleB: Product){
          if(rarityMap.get(singleA.rarity) > rarityMap.get(singleB.rarity)){
            return -1;
          }
          else if(rarityMap.get(singleA.rarity) < rarityMap.get(singleB.rarity)){
            return 1;
          }
          return 0;
        }
        break;

      case "Descending":
      sortFunction = function(singleA: Product, singleB: Product){
        if(rarityMap.get(singleA.rarity) < rarityMap.get(singleB.rarity)){
          return -1;
        }
        else if(rarityMap.get(singleA.rarity) > rarityMap.get(singleB.rarity)){
          return 1;
        }
        return 0;
      }
      break;
    }
    this.singleList.sort(sortFunction);
  }

  

}
